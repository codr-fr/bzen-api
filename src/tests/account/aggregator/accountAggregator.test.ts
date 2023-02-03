import { v4 } from 'uuid'
import { AccountAggregator } from '../../../domain/account/aggregator/accountAggregator'
import { AccountAttachedEvent, Role } from '../../../domain/account/event/accountAttachedEvent'
import { AccountCreatedEvent } from '../../../domain/account/event/accountCreatedEvent'
import { AccountCreditedEvent } from '../../../domain/account/event/accountCreditedEvent'
import { AccountDebitedEvent } from '../../../domain/account/event/accountDebitedEvent'
import { AccountDetachedEvent } from '../../../domain/account/event/accountDettachedEvent'

describe('AccountAggregator', () => {
  let accountId: string
  let aggreagator: AccountAggregator

  beforeEach(() => {
    accountId = v4()
    aggreagator = new AccountAggregator(accountId)
  })

  test('Test default values', () => {
    expect(aggreagator.id).toStrictEqual(accountId)
    expect(aggreagator.currentBalance).toStrictEqual(0)
    expect(aggreagator.estimatedBalance).toStrictEqual(0)
    expect(Object.keys(aggreagator.permissions).length).toStrictEqual(0)
  })

  test('Account creation set current balance', () => {
    aggreagator.applyEvents([new AccountCreatedEvent(accountId, 42)])

    expect(aggreagator.currentBalance).toStrictEqual(42)
    expect(aggreagator.estimatedBalance).toStrictEqual(0)
  })

  test('Account credit', () => {
    aggreagator.applyEvents([new AccountCreatedEvent(accountId, 100), new AccountCreditedEvent(accountId, 40)])

    expect(aggreagator.currentBalance).toStrictEqual(140)
    expect(aggreagator.estimatedBalance).toStrictEqual(0)
  })

  test('Account debit', () => {
    aggreagator.applyEvents([new AccountCreatedEvent(accountId, 100), new AccountDebitedEvent(accountId, 40)])

    expect(aggreagator.currentBalance).toStrictEqual(60)
    expect(aggreagator.estimatedBalance).toStrictEqual(0)
  })

  test('Account multi operations', () => {
    aggreagator.applyEvents([
      new AccountCreatedEvent(accountId, 1000),
      new AccountCreditedEvent(accountId, 40),
      new AccountCreditedEvent(accountId, 40),
      new AccountDebitedEvent(accountId, 20),
      new AccountCreditedEvent(accountId, 100),
      new AccountDebitedEvent(accountId, 50),
      new AccountDebitedEvent(accountId, 70)
    ])

    expect(aggreagator.currentBalance).toStrictEqual(1040)
    expect(aggreagator.estimatedBalance).toStrictEqual(0)
  })

  test('Attach account to user', () => {
    const userIdA = v4()
    const userIdB = v4()

    aggreagator.applyEvents([
      new AccountCreatedEvent(accountId, 100),
      new AccountAttachedEvent(accountId, userIdA, Role.Owner),
      new AccountAttachedEvent(accountId, userIdB, Role.Reader)
    ])

    expect(Object.keys(aggreagator.permissions).length).toStrictEqual(2)
    expect(aggreagator.permissions[userIdA]).toStrictEqual('OWNER')
    expect(aggreagator.permissions[userIdB]).toStrictEqual('READER')
  })

  test('Detach account to user', () => {
    const userIdA = v4()
    const userIdB = v4()

    aggreagator.applyEvents([
      new AccountCreatedEvent(accountId, 100),
      new AccountAttachedEvent(accountId, userIdA, Role.Owner),
      new AccountAttachedEvent(accountId, userIdB, Role.Reader),
      new AccountDetachedEvent(accountId, userIdB)
    ])

    expect(Object.keys(aggreagator.permissions).length).toStrictEqual(1)
    expect(aggreagator.permissions[userIdA]).toStrictEqual('OWNER')
  })
})
