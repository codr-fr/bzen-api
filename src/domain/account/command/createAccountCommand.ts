import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'

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
}
