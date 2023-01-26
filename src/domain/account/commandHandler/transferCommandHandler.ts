import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { ITransferCommand } from "../command/transferCommand";
import { ACCOUNT_CREDITED_EVENT, IAccountCreditedEvent } from "../event/accountCreditedEvent";
import { ACCOUNT_DEBITED_EVENT, IAccountDebitedEvent } from "../event/accountDebitedEvent";

export const transferCommandHandler = async (command: ITransferCommand) => {
    await db();

    const eventDebitedData: IAccountDebitedEvent = {
        uuid: command.fromUuid,
        name: ACCOUNT_DEBITED_EVENT,
        payload: {
            amount: command.amount
        }
    }

    const eventCreditedData: IAccountCreditedEvent = {
        uuid: command.toUuid,
        name: ACCOUNT_CREDITED_EVENT,
        payload: {
            amount: command.amount
        }
    }    

    Event.insertMany([
        eventDebitedData,
        eventCreditedData
    ]).catch(err => {
        console.error({ err })

        throw new Error('Error!')
    })
}