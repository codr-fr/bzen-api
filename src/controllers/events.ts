import { Request, Response } from "express";
import db from "../database/mongoose";
import { Event } from "../models/event";
import { IEventAccountCreated, IPayloadAccountCreated } from "../models/events/AccountCreated";

const ACCOUNT_OPEN_EVENT = "ACCOUNT_OPEN_EVENT"
const ACCOUNT_TRANSFERT_EVENT = "ACCOUNT_TRANSFERT_EVENT"


export const events = async (_: Request, res: Response) => {
    await db();

    const events = await Event.find().exec();

    res.status(200).json(events)
}

export const createAccount = async (req: Request, res: Response) => {
    await db();

    const payload:IPayloadAccountCreated = {...req.body}

    const event = new Event(<IEventAccountCreated>{
        name: ACCOUNT_OPEN_EVENT,
        payload
    });

    await event.save().catch(err => {
        console.error({ err })

        return res.status(400).json({
            message: "Error!"
        })
    })

    res.status(200).json({
        message: "Great success!"
    })
}