import { AbstractAggregator } from '../../../framework/aggregator'
import { IEvent } from '../../../framework/event'
import { UserRegistredEvent, USER_REGISTRED_EVENT } from '../event/userRegistredEvent'
import { UserUpdatedEvent, USER_UPDATED_EVENT } from '../event/userUpdatedEvent'

export class UserAggregator extends AbstractAggregator {
  username = ''
  password = ''

  supportedEvents(): string[] {
    return [USER_REGISTRED_EVENT, USER_UPDATED_EVENT]
  }

  applyEvent(event: IEvent): void {
    super.applyEvent(event)

    switch (event.name) {
      case USER_REGISTRED_EVENT:
        this.applyRegisterUserEvent(<UserRegistredEvent>event)
        break
      case USER_UPDATED_EVENT:
        this.applyUpdateUserEvent(<UserUpdatedEvent>event)
        break
    }
  }

  private applyRegisterUserEvent(event: UserRegistredEvent) {
    this.username = event.payload.username
    this.password = event.payload.password
  }

  private applyUpdateUserEvent(event: UserUpdatedEvent) {
    this.username = event.payload.username
  }
}
