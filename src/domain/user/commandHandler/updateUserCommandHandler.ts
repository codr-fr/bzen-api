import db from "../../../database/mongoose"
import { Event } from "../../../models/event"
import { IUpdateUserCommand } from "../command/updateUserCommand"
import { UserUpdatedEvent } from "../event/userUpdatedEvent"

export const updateUserCommandHandler = async (command: IUpdateUserCommand) => {
    await db()

    const event = new UserUpdatedEvent(command.uuid, command.username)
    const eventDocument = new Event(event)

    await eventDocument.save().catch(err => {
        console.error({ err })
        throw new Error('Error!')
    })
}