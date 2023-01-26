import { IEvent } from "../../../interface/event"

export const ACCOUNT_CREDITED_EVENT = "ACCOUNT_CREDITED_EVENT"

export interface IAccountCreditedEvent extends IEvent {
    payload: {
        amount: number
    }
}