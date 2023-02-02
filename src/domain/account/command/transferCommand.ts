import Joi from "joi"
import { AbstractCommand } from "../../../interface/command"

export class TransferCommand extends AbstractCommand {
    fromUuid: string
    toUuid: string
    amount: number

    constructor(command: TransferCommand) {
        super()
        this.fromUuid = command.fromUuid
        this.toUuid = command.toUuid
        this.amount = command.amount
    }

    getSchema() {
        return Joi.object({
            fromUuid: Joi.string().uuid(),
            toUuid: Joi.string().uuid(),
            amount: Joi.number().positive()
        })
    }    
}