import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"

interface Payload extends ICommandPayload {
    username: string
    password: string
}

export class LoginUserCommand extends AbstractCommand {
    username: string
    password: string

    constructor(payload: Payload) {
        super(payload)
        this.username = payload.username
        this.password = payload.password
    }

    getSchema() {
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    }
}
