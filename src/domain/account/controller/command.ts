import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import { AttachAccountCommand } from '../command/attachAccountCommand'
import { CreateAccountCommand } from '../command/createAccountCommand'
import { CreditAccountCommand } from '../command/creditAccountCommand'
import { DebitAccountCommand } from '../command/debitAccountCommand'
import { DetachAccountCommand } from '../command/detachAccountCommand'
import { TransferCommand } from '../command/transferCommand'

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new CreateAccountCommand({
      userId: req.auth?.id,
      initialBalance: req.body.initialBalance
    })
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const creditAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new CreditAccountCommand(req.body)
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const debitAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new DebitAccountCommand(req.body)
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const transferBetweenAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new TransferCommand(req.body)
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const attachAccountToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new AttachAccountCommand(req.body)
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const detachAccountToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new DetachAccountCommand(req.body)
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}
