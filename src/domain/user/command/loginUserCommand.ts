import Joi from "joi"
import { AbstractCommand } from "../../../interface/command"

export class LoginUserCommand extends AbstractCommand {
    username: string
    password: string

    constructor(command: LoginUserCommand) {
        super()
        this.username = command.username
        this.password = command.password
    }

    getSchema() {
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    }

    async validate(): Promise<void> {
        await super.validate()
    }    
}
