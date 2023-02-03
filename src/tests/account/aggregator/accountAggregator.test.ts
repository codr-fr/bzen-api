import { v4 } from 'uuid'
import { AccountAggregator } from '../../../domain/account/aggregator/accountAggregator'
import { AccountCreatedEvent } from '../../../domain/account/event/accountCreatedEvent'
import { AccountCreditedEvent } from '../../../domain/account/event/accountCreditedEvent'
import { AccountDebitedEvent } from '../../../domain/account/event/accountDebitedEvent'

/*
case ACCOUNT_CREATED_EVENT:
    this.applyCreateAccountEvent(<AccountCreatedEvent>event)
    break

case ACCOUNT_CREDITED_EVENT:
    this.applyCreditAccountEvent(<AccountCreditedEvent>event)
    break

case ACCOUNT_DEBITED_EVENT:
    this.applyDebitAccountEvent(<AccountDebitedEvent>event)
    break

case ACCOUNT_ATTACHED_EVENT:
    this.applyAttachAccountEvent(<AccountAttachedEvent>event)
    break
*/

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
})
