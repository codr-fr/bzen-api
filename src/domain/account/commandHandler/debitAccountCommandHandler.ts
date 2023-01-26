import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { IDebitAccountCommand } from "../command/debitAccountCommand";
import { ACCOUNT_DEBITED_EVENT } from "../event";
import { IAccountDebitedEvent } from "../event/accountDebitedEvent";

export const debitAccountCommandHandler = async (command: IDebitAccountCommand) => {
    await db();

    const eventData: IAccountDebitedEvent = {
        uuid: command.uuid,
        name: ACCOUNT_DEBITED_EVENT,
        command
    }

    const event = new Event(eventData);

    await event.save().catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}