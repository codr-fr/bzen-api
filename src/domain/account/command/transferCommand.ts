import Joi from "joi"
import { ICommand } from "../../../interface/command"
import { validateSchema } from "../../user/validators"

export class TransferCommand implements ICommand {
    fromUuid: string
    toUuid: string
    amount: number

    constructor(command: TransferCommand) {
        this.fromUuid = command.fromUuid
        this.toUuid = command.toUuid
        this.amount = command.amount
    }

    getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            fromUuid: Joi.string().uuid(),
            toUuid: Joi.string().uuid(),
            amount: Joi.number().positive()
        })
    }
    validate(): void {
        validateSchema(this)
    }    
}