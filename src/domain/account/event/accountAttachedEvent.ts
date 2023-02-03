import { IEvent } from "../../../interface/event"

export const ACCOUNT_ATTACHED_EVENT = "ACCOUNT_ATTACHED_EVENT"

export enum Role {
    Owner = "OWNER",
    Reader = "READER",
    Editor = "EDITOR"
}

interface Payload {
    userId: string
    role: Role
}

export class AccountAttachedEvent implements IEvent {
    date?: Date | undefined
    uuid: string
    name: string = ACCOUNT_ATTACHED_EVENT
    payload: Payload

    constructor(accountId: string, userId: string, role: Role) {
        this.uuid = accountId
        this.payload = {
            userId, role
        }
    }
}