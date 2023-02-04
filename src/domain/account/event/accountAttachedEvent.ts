import { IEvent } from '../../../framework/event'
import { Role } from '../enums'

export const ACCOUNT_ATTACHED_EVENT = 'ACCOUNT_ATTACHED_EVENT'

interface Payload {
  userId: string
  role: Role
}

export class AccountAttachedEvent implements IEvent {
  date?: Date | undefined
  uuid: string
  name: string = ACCOUNT_ATTACHED_EVENT
  payload: Payload

  constructor(accountId: string, userId: string, role: Role) {
    this.uuid = accountId
    this.payload = {
      userId,
      role
    }
  }
}
