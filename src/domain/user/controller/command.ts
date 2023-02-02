import { NextFunction, Request, Response } from "express"
import { RegisterUserCommand } from "../command/registerUserCommand"
import { UpdateUserCommand } from "../command/updateUserCommand"
import { registerUserCommandHandler } from "../commandHandler/registerUserCommandHandler"
import { updateUserCommandHandler } from "../commandHandler/updateUserCommandHandler"

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    const command = new RegisterUserCommand(req.body)

    try {
        await command.validate()
        await registerUserCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    const command = new UpdateUserCommand(req.body)

    try {
        await command.validate()
        await updateUserCommandHandler(command)
        next()
    } catch (error: any) {
        next(error)
    }
}