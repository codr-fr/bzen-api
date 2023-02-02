import { NextFunction, Request, Response } from "express";
import { IRegisterUserCommand, registerUserCommandValidate } from "../command/registerUserCommand";
import { registerUserCommandHandler } from "../commandHandler/registerUserCommandHandler";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    const command: IRegisterUserCommand = {...req.body}

    try {
        await registerUserCommandValidate(command)
        await registerUserCommandHandler(command);
        next()
    } catch (error: any) {
        next(error)
    }
}