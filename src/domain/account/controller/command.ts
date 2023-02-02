import { NextFunction, Request, Response } from "express"

// import amqplib from 'amqplib'
import { CreateAccountCommand } from "../command/createAccountCommand"
import { CreditAccountCommand } from "../command/creditAccountCommand"
import { DebitAccountCommand } from "../command/debitAccountCommand"
import { TransferCommand } from "../command/transferCommand"
import { createAccountCommandHandler } from "../commandHandler/createAccountCommandHandler"
import { creditAccountCommandHandler } from "../commandHandler/creditAccountCommandHandler"
import { debitAccountCommandHandler } from "../commandHandler/debitAccountCommandHandler"
import { transferCommandHandler } from "../commandHandler/transferCommandHandler"

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const command = new CreateAccountCommand(req.body)
        await createAccountCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}

export const creditAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const command = new CreditAccountCommand(req.body)
        await creditAccountCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}

export const debitAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const command = new DebitAccountCommand(req.body)
        await debitAccountCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}


export const transferBetweenAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const command = new TransferCommand(req.body)
        await transferCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}