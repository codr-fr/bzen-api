import { IEvent } from "../../../interface/event"

export const ACCOUNT_DEBITED_EVENT = "ACCOUNT_DEBITED_EVENT"

interface Payload {
    amount: number
}

export class AccountDebitedEvent implements IEvent {
    date?: Date | undefined
    uuid: string
    name: string = ACCOUNT_DEBITED_EVENT
    payload: Payload

    constructor(accountId: string, amount: number) {
        this.uuid = accountId
        this.payload = {
            amount
        }
    }
}