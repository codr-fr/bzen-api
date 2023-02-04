import { IEvent } from '../../../framework/event'

export const ACCOUNT_DETACHED_EVENT = 'ACCOUNT_DETACHED_EVENT'

interface Payload {
  userId: string
}

export class AccountDetachedEvent implements IEvent {
  date?: Date | undefined
  uuid: string
  name: string = ACCOUNT_DETACHED_EVENT
  payload: Payload

  constructor(accountId: string, userId: string) {
    this.uuid = accountId
    this.payload = {
      userId
    }
  }
}
