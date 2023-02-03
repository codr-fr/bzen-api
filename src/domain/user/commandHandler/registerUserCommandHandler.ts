import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { saveEvent } from '../../../model/event'
import { RegisterUserCommand } from '../command/registerUserCommand'
import { UserRegistredEvent } from '../event/userRegistredEvent'

export const registerUserCommandHandler = async (command: RegisterUserCommand) => {
  const uuid = v4()
  const saltRounds = process.env.BCRYPT_SALT_ROUND || '11'
  const salt = bcrypt.genSaltSync(parseInt(saltRounds))
  const hash = bcrypt.hashSync(command.password, salt)

  await saveEvent(new UserRegistredEvent(uuid, command.username, hash))
}
