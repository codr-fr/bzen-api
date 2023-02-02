import db from "../../../database/mongoose"
import { Event } from "../../../models/event"
import { IDebitAccountCommand } from "../command/debitAccountCommand"
import { AccountDebitedEvent } from "../event/accountDebitedEvent"

export const debitAccountCommandHandler = async (command: IDebitAccountCommand) => {
    await db()

    const event = new AccountDebitedEvent(command.uuid, command.amount)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}