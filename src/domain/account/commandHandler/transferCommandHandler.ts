import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { ITransferCommand } from "../command/transferCommand";
import { AccountCreditedEvent } from "../event/accountCreditedEvent";
import { AccountDebitedEvent } from "../event/accountDebitedEvent";

export const transferCommandHandler = async (command: ITransferCommand) => {
    await db();

    const eventDebited = new AccountDebitedEvent(command.fromUuid, command.amount)
    const eventCredited = new AccountCreditedEvent(command.toUuid, command.amount)
     
    Event.insertMany([
        eventDebited,
        eventCredited
    ]).catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}