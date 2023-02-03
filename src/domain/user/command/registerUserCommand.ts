import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'
import { validateUserNameIsAvailable } from '../validators'

interface Payload {
  username: string
  password: string
}

export class RegisterUserCommand extends AbstractCommand {
  username: string
  password: string

  constructor(payload: Payload) {
    super(payload)
    this.username = payload.username
    this.password = payload.password
  }

  getSchema() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }

  async validate(): Promise<void> {
    await validateUserNameIsAvailable(this.username)
  }
}
