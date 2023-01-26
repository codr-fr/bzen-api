import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { ICreditAccountCommand } from "../command/creditAccountCommand";
import { ACCOUNT_CREDITED_EVENT } from "../event";
import { IAccountCreditedEvent } from "../event/accountCreditedEvent";

export const creditAccountCommandHandler = async (command: ICreditAccountCommand) => {
    await db();

    const eventData: IAccountCreditedEvent = {
        uuid: command.uuid,
        name: ACCOUNT_CREDITED_EVENT,
        command
    }

    const event = new Event(eventData);

    await event.save().catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}