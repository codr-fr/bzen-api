import { saveEvent } from '../../../model/event'
import { DetachAccountCommand } from '../command/detachAccountCommand'
import { AccountDetachedEvent } from '../event/accountDettachedEvent'

export const detachAccountCommandHandler = async (command: DetachAccountCommand) => {
  const event = new AccountDetachedEvent(command.accountId, command.userId)
  await saveEvent(event)
}
