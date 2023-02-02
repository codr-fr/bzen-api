import { Request, Response } from "express"
import db from "../../../database/mongoose"
import { Event } from "../../../models/event"
import { AccountAggregator } from "../aggregator/accountAggregator"

export const getAccount = async (req: Request, res: Response) => {
    await db()

    const uuid: string = req.params.uuid
    const events = await Event.find({uuid}).exec()
    const account: AccountAggregator = new AccountAggregator(uuid).applyEvents(events)

    res.status(200).json({account})
}
