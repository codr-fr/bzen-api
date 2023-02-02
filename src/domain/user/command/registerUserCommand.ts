import Joi from "joi"
import { ICommand } from "../../../interface/command"
import { validateSchema, validateUserNameIsAvailable } from "../validators"

export class RegisterUserCommand implements ICommand {
    username: string
    password: string

    constructor(command: RegisterUserCommand) {
        this.username = command.username
        this.password = command.password
    }

    getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    }

    async validate(): Promise<void> {
        validateSchema(this)
        await validateUserNameIsAvailable(this.username)
    }    
}
