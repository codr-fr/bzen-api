import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"

interface Payload extends ICommandPayload {
    initialBalance: number
}

export class CreateAccountCommand extends AbstractCommand {
    initialBalance: number

    constructor(payload: Payload) {
        super(payload)
        this.initialBalance = payload.initialBalance
    }

    getSchema() {
        return Joi.object({
            initialBalance: Joi.number().required()
        })
    }
}
