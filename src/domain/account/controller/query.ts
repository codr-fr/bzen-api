import { Response } from "express"
import { Request } from "express-jwt"
import { findAccount, findAccountByUser } from "../repository"

export const getAccount = async (req: Request, res: Response) => {
    const account = await findAccount(req.params.accountId)
    res.status(200).json(account.toObject())
}

export const getUserAccounts = async (req: Request, res: Response) => {
    const accounts = await findAccountByUser(req.auth?.id)
    res.status(200).json(accounts.map(account => account.toObject()))
}