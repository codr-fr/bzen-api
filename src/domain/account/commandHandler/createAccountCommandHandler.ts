import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { ICreateAccountCommand } from "../command/createAccountCommand";
import { ACCOUNT_OPEN_EVENT } from "../event";
import { IAccountCreatedEvent } from "../event/accountCreatedEvent";

export const createAccountCommandHandler = async (command: ICreateAccountCommand) => {
    await db();

    const event = new Event(<IAccountCreatedEvent>{
        name: ACCOUNT_OPEN_EVENT,
        command
    });

    await event.save().catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}