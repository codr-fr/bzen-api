import Joi from "joi"
import { AbstractCommand } from "../../../interface/command"
import { validateUserNameIsAvailable } from "../validators"

export class UpdateUserCommand extends AbstractCommand {
    uuid: string = ''
    username: string = ''
    
    constructor(command: UpdateUserCommand) {
        super()
        this.uuid = command.uuid
        this.username = command.username
    }

    getSchema() {
        return Joi.object({
            uuid: Joi.string().uuid().required(),
            username: Joi.string().required(),
        })
    }

    async validate(): Promise<void> {
        await super.validate()
        await validateUserNameIsAvailable(this.username)
    }
}
