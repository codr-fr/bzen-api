import { NextFunction, Request, Response } from "express"
import bcrypt from "bcrypt"
import db from "../../../database/mongoose"
import jwt from "jsonwebtoken"
import { LoginUserCommand } from "../command/loginUserCommand"
import { Event } from "../../../model/event"
import { USER_REGISTRED_EVENT } from "../event/userRegistredEvent"
import { USER_UPDATED_EVENT } from "../event/userUpdatedEvent"
import { UsersAggregator } from "../aggregator/usersAggregator"
import { UserAggregator } from "../aggregator/userAggregator"

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    await db()

    let command: LoginUserCommand;

    try {
        command = new LoginUserCommand(req.body)
    } catch (error: any) {
        next(error)
        return
    }

    const events = await Event.find({name: { $in: [USER_REGISTRED_EVENT, USER_UPDATED_EVENT]}}).exec()
    const usersAggregator: UsersAggregator = <UsersAggregator> new UsersAggregator().applyEvents(events)
    const user: UserAggregator | undefined = usersAggregator.users.find(user => user.username === command.username)
    
    if (user === undefined) {
        console.error(`user not found`)
        next(new Error(`Can't login`))
        return
    }

    if(!bcrypt.compareSync(command.password, user.password)) {
        console.error(`password do no match`)
        next(new Error(`Can't login`))
        return
    }

    const tokenOptions: jwt.SignOptions = {
        algorithm: <jwt.Algorithm>process.env.JWT_ALGORITH || 'HS256',
        expiresIn: process.env.JWT_TTL || '1h'
    }

    const token = jwt.sign(user.toObject(['password']), String(process.env.JWT_SECRET), tokenOptions)

    res.status(200).json({token})
}
