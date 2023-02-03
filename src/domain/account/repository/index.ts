import db from "../../../database/mongoose"
import { Event } from "../../../model/event"
import { AccountAggregator } from "../aggregator/accountAggregator"

export const findAccount = async(uuid: string): Promise<AccountAggregator> => {
    await db()
    const events = await Event.find({uuid}).exec()
    return new AccountAggregator(uuid).applyEvents(events)
}
