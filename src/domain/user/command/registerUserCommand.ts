import Joi from 'joi'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { AbstractCommand } from '../../../framework/command'
import { validateUserNameIsAvailable } from '../validators'
import { saveEvent } from '../../../framework/event'
import { UserRegistredEvent } from '../event/userRegistredEvent'

interface Payload {
  username: string
  password: string
}

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUserCommand:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: x
 *         password: x
 */
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

  async handle(): Promise<void> {
    const uuid = v4()
    const saltRounds = process.env.BCRYPT_SALT_ROUND || '11'
    const salt = bcrypt.genSaltSync(parseInt(saltRounds))
    const hash = bcrypt.hashSync(this.password, salt)

    await saveEvent(new UserRegistredEvent(uuid, this.username, hash))
  }
}
