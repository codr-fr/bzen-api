import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { AccountAggregator } from "../aggregator/accountAggregator"
import { AccountsAggregator } from "../aggregator/accountsAggregator"
import { ACCOUNT_ATTACHED_EVENT } from "../event/accountAttachedEvent"
import { ACCOUNT_CREATED_EVENT } from "../event/accountCreatedEvent"

export const findAccount = async(accountId: string): Promise<AccountAggregator> => {
    await db()
    const events = await Event.find({uuid: accountId}).exec()
    return new AccountAggregator(accountId).applyEvents(events)
}

export const findAccountByUser = async(userId: string): Promise<AccountAggregator[]> => {
    await db()
    const events = await Event.find({name: {$in: [ACCOUNT_CREATED_EVENT, ACCOUNT_ATTACHED_EVENT]}}).exec()

    return new AccountsAggregator()
        .applyEvents(events)
        .aggregators
        .filter(account => userId in account.permissions)
}