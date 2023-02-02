import { NextFunction, Request, Response } from "express";
import { IRegisterUserCommand, registerUserCommandValidate } from "../command/registerUserCommand";
import { IUpdateUserCommand, updateUserCommandValidate } from "../command/updateUserCommand";
import { registerUserCommandHandler } from "../commandHandler/registerUserCommandHandler";
import { updateUserCommandHandler } from "../commandHandler/updateUserCommandHandler";

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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    const command: IUpdateUserCommand = {...req.body}

    try {
        await updateUserCommandValidate(command)
        await updateUserCommandHandler(command);
        next()
    } catch (error: any) {
        next(error)
    }
}