import { saveEvent } from '../../../model/event'
import { AttachAccountCommand } from '../command/attachAccountCommand'
import { AccountAttachedEvent } from '../event/accountAttachedEvent'

export const attachAccountCommandHandler = async (command: AttachAccountCommand) => {
  const event = new AccountAttachedEvent(command.accountId, command.userId, command.role)
  await saveEvent(event)
}
