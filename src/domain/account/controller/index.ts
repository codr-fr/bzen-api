import { NextFunction, Request, Response } from "express";
import db from "../../../database/mongoose";
import { Event } from "../../../models/event";
import { AccountAggregator, create, handleEvents } from "../aggregator/accountAggregator";

// import amqplib from 'amqplib';
import { createAccountCommandValidate, ICreateAccountCommand } from "../command/createAccountCommand";
import { creditAccountCommandValidate, ICreditAccountCommand } from "../command/creditAccountCommand";
import { IDebitAccountCommand } from "../command/debitAccountCommand";
import { ITransferCommand, transferCommandValidate } from "../command/transferCommand";
import { createAccountCommandHandler } from "../commandHandler/createAccountCommandHandler"
import { creditAccountCommandHandler } from "../commandHandler/creditAccountCommandHandler";
import { debitAccountCommandHandler } from "../commandHandler/debitAccountCommandHandler";
import { transferCommandHandler } from "../commandHandler/transferCommandHandler";

export const getAccount = async (req: Request, res: Response) => {
    await db()

    const uuid: string = req.params.uuid
    const events = await Event.find({uuid}).exec()
    const account: AccountAggregator = handleEvents(create(uuid), events)

    res.status(200).json({account})
}

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {

    const command: ICreateAccountCommand = {...req.body}

    try {
        createAccountCommandValidate(command)
        await createAccountCommandHandler(command);
        next()
    } catch (error: any) {
        next(error)
    }
}

export const creditAccount = async (req: Request, res: Response, next: NextFunction) => {

    const command: ICreditAccountCommand = {...req.body}

    try {
        creditAccountCommandValidate(command)
        await creditAccountCommandHandler(command);
        next()
    } catch (error: any) {
        next(error)
    }
}

export const debitAccount = async (req: Request, res: Response, next: NextFunction) => {

    const command: IDebitAccountCommand = {...req.body}

    try {
        creditAccountCommandValidate(command)
        await debitAccountCommandHandler(command);
        next()
    } catch (error: any) {
        next(error)
    }
}


export const transferBetweenAccounts = async (req: Request, res: Response, next: NextFunction) => {

    const command: ITransferCommand = {...req.body}

    try {
        transferCommandValidate(command)
        await transferCommandHandler(command);
        next()
    } catch (error: any) {
        next(error)
    }
}