import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { ICreateAccountCommand } from "../command/createAccountCommand";
import { ACCOUNT_CREATED_EVENT, IAccountCreatedEvent } from "../event/accountCreatedEvent";
import {v4} from "uuid";

export const createAccountCommandHandler = async (command: ICreateAccountCommand) => {
    await db();

    const eventData: IAccountCreatedEvent = {
        uuid: v4(),
        name: ACCOUNT_CREATED_EVENT,
        payload: {
            initialBalance: command.initialBalance
        }
    }

    const event = new Event(eventData);

    await event.save().catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}