import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"

interface Payload extends ICommandPayload {
    fromUuid: string
    toUuid: string
    amount: number
}

export class TransferCommand extends AbstractCommand {
    fromUuid: string
    toUuid: string
    amount: number

    constructor(payload: Payload) {
        super(payload)
        this.fromUuid = payload.fromUuid
        this.toUuid = payload.toUuid
        this.amount = payload.amount
    }

    getSchema() {
        return Joi.object({
            fromUuid: Joi.string().uuid(),
            toUuid: Joi.string().uuid(),
            amount: Joi.number().positive()
        })
    }    
}