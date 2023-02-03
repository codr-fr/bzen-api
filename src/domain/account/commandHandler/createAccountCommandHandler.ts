import db from '../../../database/mongoose'
import { v4 } from 'uuid'
import { Event } from '../../../model/event'
import { CreateAccountCommand } from '../command/createAccountCommand'
import { AccountAttachedEvent, Role } from '../event/accountAttachedEvent'
import { AccountCreatedEvent } from '../event/accountCreatedEvent'

export const createAccountCommandHandler = async (command: CreateAccountCommand) => {
  await db()

  const uuid = v4()
  const eventCreated = new AccountCreatedEvent(uuid, command.initialBalance)
  const eventAttached = new AccountAttachedEvent(uuid, command.userId, Role.Owner)

  Event.insertMany([eventCreated, eventAttached]).catch((err) => {
    console.error({ err })
    throw new Error('Error!')
  })
}
