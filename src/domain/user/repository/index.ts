import { findAll } from '../../../framework/repository'
import { UserAggregator } from '../aggregator/userAggregator'

export const findUserByUsername = async (value: string): Promise<UserAggregator | undefined> => {
  const users = await findAll(UserAggregator)
  return users.find((user) => user.username === value)
}
