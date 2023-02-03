import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import { AttachAccountCommand } from '../command/attachAccountCommand'
import { CreateAccountCommand } from '../command/createAccountCommand'
import { CreditAccountCommand } from '../command/creditAccountCommand'
import { DebitAccountCommand } from '../command/debitAccountCommand'
import { DetachAccountCommand } from '../command/detachAccountCommand'
import { TransferCommand } from '../command/transferCommand'
import { attachAccountCommandHandler } from '../commandHandler/attachAccountCommandHandler'
import { createAccountCommandHandler } from '../commandHandler/createAccountCommandHandler'
import { creditAccountCommandHandler } from '../commandHandler/creditAccountCommandHandler'
import { debitAccountCommandHandler } from '../commandHandler/debitAccountCommandHandler'
import { detachAccountCommandHandler } from '../commandHandler/detachAccountCommandHandler'
import { transferCommandHandler } from '../commandHandler/transferCommandHandler'

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new CreateAccountCommand({
      userId: req.auth?.id,
      initialBalance: req.body.initialBalance
    })
    await createAccountCommandHandler(command)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const creditAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new CreditAccountCommand(req.body)
    await creditAccountCommandHandler(command)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const debitAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new DebitAccountCommand(req.body)
    await debitAccountCommandHandler(command)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const transferBetweenAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new TransferCommand(req.body)
    await transferCommandHandler(command)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const attachAccountToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new AttachAccountCommand(req.body)
    await attachAccountCommandHandler(command)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const detachAccountToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new DetachAccountCommand(req.body)
    await detachAccountCommandHandler(command)
    next()
  } catch (error: unknown) {
    next(error)
  }
}
