import db from '../../../database/mongoose'
import { Aggregator } from '../../../interface/aggregator'
import { Event } from '../../../model/event'
import { UserAggregator } from '../aggregator/userAggregator'
import userEvents from '../event'

export const findAllUsers = async (): Promise<UserAggregator[]> => {
  await db()
  const events = await Event.find().exec()
  return new Aggregator(UserAggregator, userEvents).applyEvents(events).aggregators
}

export const findUserByUsername = async (value: string): Promise<UserAggregator | undefined> => {
  const users = await findAllUsers()
  return users.find((user) => user.username === value)
}
