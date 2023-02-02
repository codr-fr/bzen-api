import { IEvent } from "../../../interface/event"

export const ACCOUNT_CREDITED_EVENT = "ACCOUNT_CREDITED_EVENT"

interface Payload {
    amount: number
}

export class AccountCreditedEvent implements IEvent {
    date?: Date | undefined
    uuid: string
    name: string = ACCOUNT_CREDITED_EVENT
    payload: Payload

    constructor(accountId: string, amount: number) {
        this.uuid = accountId
        this.payload = {
            amount
        }
    }
}