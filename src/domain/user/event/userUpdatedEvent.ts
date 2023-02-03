import { IEvent } from '../../../interface/event'

export const USER_UPDATED_EVENT = 'USER_UPDATED_EVENT'

interface Payload {
  username: string
}

export class UserUpdatedEvent implements IEvent {
  date?: Date | undefined
  uuid: string
  name: string = USER_UPDATED_EVENT
  payload: Payload

  constructor(uuid: string, username: string) {
    this.uuid = uuid
    this.payload = {
      username
    }
  }
}
