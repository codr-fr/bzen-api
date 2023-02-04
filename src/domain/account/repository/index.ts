import db from '../../../database/mongoose'
import { Aggregator } from '../../../interface/aggregator'
import { Event } from '../../../model/event'
import { AccountAggregator } from '../aggregator/accountAggregator'
import accountEvents from '../event'

export const findAllAccounts = async (): Promise<AccountAggregator[]> => {
  await db()
  const events = await Event.find().exec()
  return new Aggregator(AccountAggregator, accountEvents).applyEvents(events).aggregators
}

export const findAccount = async (accountId: string): Promise<AccountAggregator> => {
  await db()
  const events = await Event.find({ uuid: accountId }).exec()
  return new AccountAggregator(accountId).applyEvents(events)
}

export const findAccountByUser = async (userId: string): Promise<AccountAggregator[]> => {
  const accounts = await findAllAccounts()
  return accounts.filter((account) => userId in account.permissions)
}
