import db from "../../../database/mongoose"
import { Event } from "../../../models/event"
import { ICreditAccountCommand } from "../command/creditAccountCommand"
import { AccountCreditedEvent } from "../event/accountCreditedEvent"

export const creditAccountCommandHandler = async (command: ICreditAccountCommand) => {
    await db()

    const event = new AccountCreditedEvent(command.uuid, command.amount)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}