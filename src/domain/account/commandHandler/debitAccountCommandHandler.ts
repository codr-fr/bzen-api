import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { DebitAccountCommand } from "../command/debitAccountCommand"
import { AccountDebitedEvent } from "../event/accountDebitedEvent"

export const debitAccountCommandHandler = async (command: DebitAccountCommand) => {
    await db()

    const event = new AccountDebitedEvent(command.uuid, command.amount)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}