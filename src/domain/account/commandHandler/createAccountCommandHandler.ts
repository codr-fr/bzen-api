import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { ICreateAccountCommand } from "../command/createAccountCommand";
import { ACCOUNT_OPEN_EVENT } from "../event";
import { IAccountCreatedEvent } from "../event/accountCreatedEvent";

export const createAccountCommandHandler = async (command: ICreateAccountCommand) => {
    await db();

    const eventData: IAccountCreatedEvent = {
        uuid: command.uuid,
        name: ACCOUNT_OPEN_EVENT,
        command
    }

    const event = new Event(eventData);

    await event.save().catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}