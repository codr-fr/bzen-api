import db from '../../../database/mongoose'
import { Event } from '../../../model/event'
import { UpdateUserCommand } from '../command/updateUserCommand'
import { UserUpdatedEvent } from '../event/userUpdatedEvent'

export const updateUserCommandHandler = async (command: UpdateUserCommand) => {
  await db()

  const event = new UserUpdatedEvent(command.userId, command.username)
  const eventDocument = new Event(event)

  await eventDocument.save().catch((err) => {
    console.error({ err })
    throw new Error('Error!')
  })
}
