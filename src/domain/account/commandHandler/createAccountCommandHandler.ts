import db from "../../../database/mongoose"
import { Event } from "../../../models/event"
import { ICreateAccountCommand } from "../command/createAccountCommand"
import { AccountCreatedEvent } from "../event/accountCreatedEvent"

export const createAccountCommandHandler = async (command: ICreateAccountCommand) => {
    await db()

    const event = new AccountCreatedEvent(command.initialBalance)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}