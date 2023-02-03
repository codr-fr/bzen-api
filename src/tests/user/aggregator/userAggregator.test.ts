import { v4 } from 'uuid'
import { UserAggregator } from '../../../domain/user/aggregator/userAggregator'
import { UserRegistredEvent } from '../../../domain/user/event/userRegistredEvent'
import { UserUpdatedEvent } from '../../../domain/user/event/userUpdatedEvent'

describe('UserAggregator', () => {
  let userId: string
  let aggreagator: UserAggregator

  beforeEach(() => {
    userId = v4()
    aggreagator = new UserAggregator(userId)
  })

  test('Default username is empty', () => {
    expect(aggreagator.username).toStrictEqual('')
  })

  test('User should register', () => {
    aggreagator.applyEvents([new UserRegistredEvent(userId, 'John', 'AZERTYUIOP')])

    expect(aggreagator.username).toStrictEqual('John')
    expect(aggreagator.password).toStrictEqual('AZERTYUIOP')
  })

  test('User should update username', () => {
    aggreagator.applyEvents([new UserRegistredEvent(userId, 'John', 'AZERTYUIOP'), new UserUpdatedEvent(userId, 'Foo')])

    expect(aggreagator.username).toStrictEqual('Foo')
    expect(aggreagator.password).toStrictEqual('AZERTYUIOP')
  })

  test('User should update username as many time as wanted', () => {
    aggreagator.applyEvents([
      new UserRegistredEvent(userId, 'John', 'AZERTYUIOP'),
      new UserUpdatedEvent(userId, 'Foo'),
      new UserUpdatedEvent(userId, 'Bar'),
      new UserUpdatedEvent(userId, 'Baz')
    ])

    expect(aggreagator.username).toStrictEqual('Baz')
    expect(aggreagator.password).toStrictEqual('AZERTYUIOP')
  })
})
