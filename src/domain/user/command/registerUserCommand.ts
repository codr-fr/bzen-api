import Joi from "joi"
import { AbstractCommand } from "../../../interface/command"
import { validateUserNameIsAvailable } from "../validators"

export class RegisterUserCommand extends AbstractCommand {
    username: string
    password: string

    constructor(command: RegisterUserCommand) {
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
        await validateUserNameIsAvailable(this.username)
    }    
}
