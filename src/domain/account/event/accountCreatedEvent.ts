import { IEvent } from "../../../interface/event"

export const ACCOUNT_CREATED_EVENT = "ACCOUNT_CREATED_EVENT"

export interface IAccountCreatedEvent extends IEvent {
    payload: {
        initialBalance: number
    }
}