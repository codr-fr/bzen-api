import Joi from "joi"
import db from "../../../database/mongoose"
import { ICommand } from "../../../interface/command"
import { Event } from "../../../models/event"
import { UsersAggregator } from "../aggregator/usersAggregator"
import { USER_REGISTRED_EVENT } from "../event/userRegistredEvent"
import { USER_UPDATED_EVENT } from "../event/userUpdatedEvent"

export const validateSchema = (command: ICommand) => {
    const isValidateResult: Joi.ValidationResult = command.getSchema().validate(command)

    if (isValidateResult?.error) {
        throw new Error(`${isValidateResult.error?.message}`)
    }
}

export const validateUserNameIsAvailable = async (username: string) => {
    await db()
    const events = await Event.find({name: { $in: [USER_REGISTRED_EVENT, USER_UPDATED_EVENT]}}).exec()
    const usersAggregator: UsersAggregator = new UsersAggregator().applyEvents(events)
    
    const user = usersAggregator.users.find(user => user.username === username)
    
    if (user !== undefined) {
        throw new Error(`Username allready taken`)
    }
}
