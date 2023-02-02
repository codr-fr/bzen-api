import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"

interface Payload extends ICommandPayload {
    accountId: string
    userId: string
    role: string
}

export class AttachAccountCommand extends AbstractCommand {
    accountId: string
    userId: string
    role: string

    constructor(payload: Payload) {
        super(payload)
        this.accountId = payload.accountId
        this.userId = payload.userId
        this.role = payload.role
    }

    getSchema() {
        return Joi.object({
            accountId: Joi.string().uuid().required(),
            userId: Joi.string().uuid().required(),
            role: Joi.string().required()
        })
    }
}
