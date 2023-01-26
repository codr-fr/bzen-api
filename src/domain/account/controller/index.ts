import { Request, Response } from "express";
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

export const createAccount = async (req: Request, res: Response) => {

    const command: ICreateAccountCommand = {...req.body}

    try {
        createAccountCommandValidate(command)
        await createAccountCommandHandler(command);

        res.status(200).json({
            message: "Great success!"
        })

    } catch (error: any) {
        console.error(error);

        res.status(500).json({
          error: error?.message,
        });
    }
}

export const creditAccount = async (req: Request, res: Response) => {

    const command: ICreditAccountCommand = {...req.body}

    try {
        creditAccountCommandValidate(command)
        await creditAccountCommandHandler(command);

        res.status(200).json({
            message: "Great success!"
        })

    } catch (error: any) {
        console.error(error);

        res.status(500).json({
          error: error?.message,
        });
    }
}

export const debitAccount = async (req: Request, res: Response) => {

    const command: IDebitAccountCommand = {...req.body}

    try {
        creditAccountCommandValidate(command)
        await debitAccountCommandHandler(command);

        res.status(200).json({
            message: "Great success!"
        })

    } catch (error: any) {
        console.error(error);

        res.status(500).json({
          error: error?.message,
        });
    }
}


export const transferBetweenAccounts = async (req: Request, res: Response) => {

    const command: ITransferCommand = {...req.body}

    try {
        transferCommandValidate(command)
        await transferCommandHandler(command);

        res.status(200).json({
            message: "Great success!"
        })

    } catch (error: any) {
        console.error(error);

        res.status(500).json({
          error: error?.message,
        });
    }
}