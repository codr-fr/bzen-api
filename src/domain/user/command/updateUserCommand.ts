import Joi from "joi"
import { ICommand } from "../../../interface/command"
import { validateSchema, validateUserNameIsAvailable } from "../validators"

export class UpdateUserCommand implements ICommand {
    uuid: string = ''
    username: string = ''
    
    constructor(command: UpdateUserCommand) {
        this.uuid = command.uuid
        this.username = command.username
    }

    getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            uuid: Joi.string().uuid().required(),
            username: Joi.string().required(),
        })
    }

    async validate(): Promise<void> {
        validateSchema(this)
        await validateUserNameIsAvailable(this.username)
    }
}
