import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { TransferCommand } from "../command/transferCommand"
import { AccountCreditedEvent } from "../event/accountCreditedEvent"
import { AccountDebitedEvent } from "../event/accountDebitedEvent"

export const transferCommandHandler = async (command: TransferCommand) => {
    await db()

    const eventDebited = new AccountDebitedEvent(command.fromAccountId, command.amount)
    const eventCredited = new AccountCreditedEvent(command.toAccountId, command.amount)
     
    Event.insertMany([
        eventDebited,
        eventCredited
    ]).catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}