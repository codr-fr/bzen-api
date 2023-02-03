import { saveEvent } from '../../../model/event'
import { UpdateUserCommand } from '../command/updateUserCommand'
import { UserUpdatedEvent } from '../event/userUpdatedEvent'

export const updateUserCommandHandler = async (command: UpdateUserCommand) => {
  await saveEvent(new UserUpdatedEvent(command.userId, command.username))
}
