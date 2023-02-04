import { AbstractAggregator } from '../../../interface/aggregator'
import { IEvent } from '../../../interface/event'
import { UserRegistredEvent, USER_REGISTRED_EVENT } from '../event/userRegistredEvent'
import { UserUpdatedEvent, USER_UPDATED_EVENT } from '../event/userUpdatedEvent'
import userEvents from '../event'

export class UserAggregator extends AbstractAggregator {
  username = ''
  password = ''

  supportedEvents(): string[] {
    return userEvents
  }

  applyEvent(event: IEvent): this {
    super.applyEvent(event)

    switch (event.name) {
      case USER_REGISTRED_EVENT:
        this.applyRegisterUserEvent(<UserRegistredEvent>event)
        break
      case USER_UPDATED_EVENT:
        this.applyUpdateUserEvent(<UserUpdatedEvent>event)
        break
    }

    return this
  }

  private applyRegisterUserEvent(event: UserRegistredEvent) {
    this.username = event.payload.username
    this.password = event.payload.password
  }

  private applyUpdateUserEvent(event: UserUpdatedEvent) {
    this.username = event.payload.username
  }
}
