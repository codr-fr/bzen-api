import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { UserAggregator } from "../aggregator/userAggregator"
import { UsersAggregator } from "../aggregator/usersAggregator"
import { USER_REGISTRED_EVENT } from "../event/userRegistredEvent"
import { USER_UPDATED_EVENT } from "../event/userUpdatedEvent"

export const findAllUsers = async(): Promise<UserAggregator[]> => {
    await db()
    const events = await Event.find({name: { $in: [USER_REGISTRED_EVENT, USER_UPDATED_EVENT]}}).exec()
    return (<UsersAggregator> new UsersAggregator().applyEvents(events)).users
}

export const findUserByUsername = async(value: string): Promise<UserAggregator | undefined> => {
    const users = await findAllUsers();
    return users.find(user => user.username === value)
}