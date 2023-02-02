import Joi from "joi"
import { AbstractCommand } from "../../../interface/command"

export class CreateAccountCommand extends AbstractCommand {
    initialBalance: number

    constructor(command: CreateAccountCommand) {
        super()
        this.initialBalance = command.initialBalance
    }

    getSchema() {
        return Joi.object({
            initialBalance: Joi.number().required()
        })
    }
}
