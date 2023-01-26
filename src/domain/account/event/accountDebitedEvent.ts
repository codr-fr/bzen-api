import { IEvent } from "../../../interface/event"

export const ACCOUNT_DEBITED_EVENT = "ACCOUNT_DEBITED_EVENT"

export interface IAccountDebitedEvent extends IEvent {
    payload: {
        amount: number
    }
}