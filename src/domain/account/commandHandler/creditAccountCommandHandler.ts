import db from '../../../database/mongoose'
import { Event } from '../../../model/event'
import { CreditAccountCommand } from '../command/creditAccountCommand'
import { AccountCreditedEvent } from '../event/accountCreditedEvent'

export const creditAccountCommandHandler = async (command: CreditAccountCommand) => {
  await db()

  const event = new AccountCreditedEvent(command.accountId, command.amount)
  const eventDocument = new Event(event)

  await eventDocument.save().catch(() => {
    //console.error({ err })
    throw new Error('Error!')
  })
}
