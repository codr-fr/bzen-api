import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'

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
}
