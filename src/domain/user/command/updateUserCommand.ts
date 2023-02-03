import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'
import { validateUserNameIsAvailable } from '../validators'

interface Payload {
  userId: string
  username: string
}

export class UpdateUserCommand extends AbstractCommand {
  userId: string
  username: string

  constructor(payload: Payload) {
    super(payload)
    this.userId = payload.userId
    this.username = payload.username
  }

  getSchema() {
    return Joi.object({
      userId: Joi.string().uuid().required(),
      username: Joi.string().required()
    })
  }

  async validate(): Promise<void> {
    await validateUserNameIsAvailable(this.username)
  }
}
