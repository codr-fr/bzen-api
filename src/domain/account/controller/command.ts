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

    const command = new CreateAccountCommand(req.body)

    try {
        await command.validate()
        await createAccountCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}

export const creditAccount = async (req: Request, res: Response, next: NextFunction) => {

    const command = new CreditAccountCommand(req.body)

    try {
        await command.validate()
        await creditAccountCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}

export const debitAccount = async (req: Request, res: Response, next: NextFunction) => {

    const command = new DebitAccountCommand(req.body)

    try {
        await command.validate()
        await debitAccountCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}


export const transferBetweenAccounts = async (req: Request, res: Response, next: NextFunction) => {

    const command = new TransferCommand(req.body)

    try {
        await command.validate()
        await transferCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}