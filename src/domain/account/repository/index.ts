import db from '../../../database/mongoose'
import { Event } from '../../../framework/event'
import { findAll } from '../../../framework/repository'
import { AccountAggregator } from '../aggregator/accountAggregator'

export const findAccount = async (accountId: string): Promise<AccountAggregator> => {
  await db()
  const events = await Event.find({ uuid: accountId }).exec()
  const aggregator = new AccountAggregator(accountId)
  aggregator.applyEvents(events)

  return aggregator
}

export const findAccountByUser = async (userId: string): Promise<AccountAggregator[]> => {
  const accounts = await findAll(AccountAggregator)
  return accounts.filter((account) => userId in account.permissions)
}
