import { IEvent } from "../../../interface/event"
import {v4} from "uuid"

export const ACCOUNT_CREATED_EVENT = "ACCOUNT_CREATED_EVENT"

interface Payload {
    initialBalance: number
}

export class AccountCreatedEvent implements IEvent {
    date?: Date | undefined
    uuid: string
    name: string = ACCOUNT_CREATED_EVENT
    payload: Payload

    constructor(initialBalance: number) {
        this.uuid = v4() 
        this.payload = {
            initialBalance
        }
    }
}