import { IEvent } from '../../../framework/event'

export const ACCOUNT_CREATED_EVENT = 'ACCOUNT_CREATED_EVENT'

interface Payload {
  initialBalance: number
}

export class AccountCreatedEvent implements IEvent {
  date?: Date | undefined
  uuid: string
  name: string = ACCOUNT_CREATED_EVENT
  payload: Payload

  constructor(accountId: string, initialBalance: number) {
    this.uuid = accountId
    this.payload = {
      initialBalance
    }
  }
}
