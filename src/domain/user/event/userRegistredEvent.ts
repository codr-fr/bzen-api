import { IEvent } from "../../../interface/event"
import {v4} from "uuid";

export const USER_REGISTRED_EVENT = "USER_REGISTRED_EVENT"

interface Payload {
    username: string
    password: string
}

export class UserRegistredEvent implements IEvent {
    date?: Date | undefined
    uuid: string
    name: string = USER_REGISTRED_EVENT
    payload: Payload

    constructor(username: string, password: string) {
        this.uuid = v4() 
        this.payload = {
            username,
            password
        }
    }
}