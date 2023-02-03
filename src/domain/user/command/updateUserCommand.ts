import Joi from 'joi'
import { AbstractCommand } from '../../../interface/command'
import { saveEvent } from '../../../model/event'
import { UserUpdatedEvent } from '../event/userUpdatedEvent'
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

  async handle(): Promise<void> {
    const event = new UserUpdatedEvent(this.userId, this.username)
    await saveEvent(event)
  }
}
