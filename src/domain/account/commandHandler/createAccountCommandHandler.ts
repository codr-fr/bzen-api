import { v4 } from 'uuid'
import { saveEvents } from '../../../model/event'
import { CreateAccountCommand } from '../command/createAccountCommand'
import { AccountAttachedEvent, Role } from '../event/accountAttachedEvent'
import { AccountCreatedEvent } from '../event/accountCreatedEvent'

export const createAccountCommandHandler = async (command: CreateAccountCommand) => {
  const uuid = v4()

  const eventCreated = new AccountCreatedEvent(uuid, command.initialBalance)
  const eventAttached = new AccountAttachedEvent(uuid, command.userId, Role.Owner)

  await saveEvents([eventCreated, eventAttached])
}
