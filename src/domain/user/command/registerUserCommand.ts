import Joi from "joi"
import db from "../../../database/mongoose"
import { ICommand } from "../../../interface/command"
import { Event } from "../../../models/event"
import { UsersAggregator } from "../aggregator/usersAggregator"
import { USER_REGISTRED_EVENT } from "../event/userRegistredEvent"
import { USER_UPDATED_EVENT } from "../event/userUpdatedEvent"

export interface IRegisterUserCommand extends ICommand {
    username: string
    password: string
}

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export const registerUserCommandValidate = async (command: IRegisterUserCommand) => {
    const isValidateResult: Joi.ValidationResult = schema.validate(command)

    if (isValidateResult?.error) {
        throw new Error(`${isValidateResult.error?.message}`)
    }

    await db()
    const events = await Event.find({name: { $in: [USER_REGISTRED_EVENT, USER_UPDATED_EVENT]}}).exec()
    const usersAggregator: UsersAggregator = new UsersAggregator().applyEvents(events)

    const user = usersAggregator.users.find(user => user.username === command.username)
    
    if (user !== undefined) {
        throw new Error(`Username allready taken`)
    }
}