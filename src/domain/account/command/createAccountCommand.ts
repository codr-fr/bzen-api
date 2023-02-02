import Joi from "joi"
import { ICommand } from "../../../interface/command"
import { validateSchema } from "../../user/validators"

export class CreateAccountCommand implements ICommand {
    initialBalance: number

    constructor(command: CreateAccountCommand) {
        this.initialBalance = command.initialBalance
    }

    getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            initialBalance: Joi.number().required()
        })
    }

    async validate(): Promise<void> {
        validateSchema(this)
    }    
}
