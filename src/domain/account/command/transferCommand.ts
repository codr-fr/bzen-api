import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"

interface Payload extends ICommandPayload {
    fromAccountId: string
    toAccountId: string
    amount: number
}

export class TransferCommand extends AbstractCommand {
    fromAccountId: string
    toAccountId: string
    amount: number

    constructor(payload: Payload) {
        super(payload)
        this.fromAccountId = payload.fromAccountId
        this.toAccountId = payload.toAccountId
        this.amount = payload.amount
    }

    getSchema() {
        return Joi.object({
            fromAccountId: Joi.string().uuid().required(),
            toAccountId: Joi.string().uuid().required(),
            amount: Joi.number().positive().required()
        })
    }    
}