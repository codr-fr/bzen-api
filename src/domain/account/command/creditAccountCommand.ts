import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"

interface Payload extends ICommandPayload {
    uuid: string
    amount: number
}

export class CreditAccountCommand extends AbstractCommand {
    uuid: string
    amount: number

    constructor(payload: Payload) {
        super(payload)
        this.uuid = payload.uuid
        this.amount = payload.amount
    }

    getSchema() {
        return Joi.object({
            uuid: Joi.string().uuid(),
            amount: Joi.number().positive()
        })
    }
}