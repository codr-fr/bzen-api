import Joi from "joi"
import { ICommand } from "../../../interface/command"
import { validateSchema } from "../../user/validators"

export class DebitAccountCommand implements ICommand {
    uuid: string
    amount: number

    constructor(command: DebitAccountCommand) {
        this.uuid = command.uuid
        this.amount = command.amount
    }

    getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            uuid: Joi.string().uuid(),
            amount: Joi.number().positive()
        })
    }

    validate(): void {
        validateSchema(this)
    }
}