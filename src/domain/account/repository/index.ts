import db from '../../../database/mongoose'
import { Event } from '../../../model/event'
import { AccountAggregator } from '../aggregator/accountAggregator'
import { AccountsAggregator } from '../aggregator/accountsAggregator'

export const findAccount = async (accountId: string): Promise<AccountAggregator> => {
  await db()
  const events = await Event.find({ uuid: accountId }).exec()
  return new AccountAggregator(accountId).applyEvents(events)
}

export const findAccountByUser = async (userId: string): Promise<AccountAggregator[]> => {
  await db()
  const events = await Event.find().exec()
  return new AccountsAggregator().applyEvents(events).aggregators.filter((account) => userId in account.permissions)
}
