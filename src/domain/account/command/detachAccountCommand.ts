import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'
import { saveEvent } from '../../../model/event'
import { AccountDetachedEvent } from '../event/accountDettachedEvent'

interface Payload {
  accountId: string
  userId: string
}

export class DetachAccountCommand extends AbstractCommand {
  accountId: string
  userId: string

  constructor(payload: Payload) {
    super(payload)
    this.accountId = payload.accountId
    this.userId = payload.userId
  }

  getSchema() {
    return Joi.object({
      accountId: Joi.string().uuid().required(),
      userId: Joi.string().uuid().required()
    })
  }

  async handle(): Promise<void> {
    const event = new AccountDetachedEvent(this.accountId, this.userId)
    await saveEvent(event)
  }
}
