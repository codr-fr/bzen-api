import Joi from "joi"
import { AbstractCommand, ICommandPayload } from "../../../interface/command"
import { validateUserNameIsAvailable } from "../validators"

interface Payload extends ICommandPayload {
    uuid: string
    username: string
}

export class UpdateUserCommand extends AbstractCommand {
    uuid: string = ''
    username: string = ''
    
    constructor(payload: Payload) {
        super(payload)
        this.uuid = payload.uuid
        this.username = payload.username
    }

    getSchema() {
        return Joi.object({
            uuid: Joi.string().uuid().required(),
            username: Joi.string().required(),
        })
    }

    async validate(): Promise<void> {
        await validateUserNameIsAvailable(this.username)
    }
}
