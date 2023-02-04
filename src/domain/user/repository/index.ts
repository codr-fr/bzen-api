import db from '../../../database/mongoose'
import { Event } from '../../../model/event'
import { UserAggregator } from '../aggregator/userAggregator'
import { UsersAggregator } from '../aggregator/usersAggregator'

export const findAllUsers = async (): Promise<UserAggregator[]> => {
  await db()
  const events = await Event.find().exec()
  return new UsersAggregator().applyEvents(events).users
}

export const findUserByUsername = async (value: string): Promise<UserAggregator | undefined> => {
  const users = await findAllUsers()
  return users.find((user) => user.username === value)
}
