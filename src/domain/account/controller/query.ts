import { Request, Response } from "express"
import { findAccount } from "../repository"

export const getAccount = async (req: Request, res: Response) => {
    const account = await findAccount(req.params.uuid)
    res.status(200).json(account.toObject())
}
