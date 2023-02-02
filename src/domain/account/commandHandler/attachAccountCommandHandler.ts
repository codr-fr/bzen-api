import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { AttachAccountCommand } from "../command/attachAccountCommand"
import { AccountAttachedEvent } from "../event/accountAttachedEvent"

export const attachAccountCommandHandler = async (command: AttachAccountCommand) => {
    await db()

    const event = new AccountAttachedEvent(command.accountId, command.userId, command.role)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}