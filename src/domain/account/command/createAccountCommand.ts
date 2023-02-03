import Joi from 'joi'
import { v4 } from 'uuid'
import { AbstractCommand } from '../../../interface/command'
import { saveEvents } from '../../../model/event'
import { AccountAttachedEvent, Role } from '../event/accountAttachedEvent'
import { AccountCreatedEvent } from '../event/accountCreatedEvent'

interface Payload {
  userId: string
  initialBalance: number
}

export class CreateAccountCommand extends AbstractCommand {
  userId: string
  initialBalance: number

  constructor(payload: Payload) {
    super(payload)
    this.userId = payload.userId
    this.initialBalance = payload.initialBalance
  }

  getSchema() {
    return Joi.object({
      userId: Joi.string().uuid().required(),
      initialBalance: Joi.number().required()
    })
  }

  async handle(): Promise<void> {
    const uuid = v4()

    const eventCreated = new AccountCreatedEvent(uuid, this.initialBalance)
    const eventAttached = new AccountAttachedEvent(uuid, this.userId, Role.Owner)

    await saveEvents([eventCreated, eventAttached])
  }
}
