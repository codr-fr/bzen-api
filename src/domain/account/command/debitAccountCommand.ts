import Joi from "joi"
import { AbstractCommand } from "../../../interface/command"

export class DebitAccountCommand extends AbstractCommand {
    uuid: string
    amount: number

    constructor(command: DebitAccountCommand) {
        super()
        this.uuid = command.uuid
        this.amount = command.amount
    }

    getSchema() {
        return Joi.object({
            uuid: Joi.string().uuid(),
            amount: Joi.number().positive()
        })
    }
}