import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import { RegisterUserCommand } from '../command/registerUserCommand'
import { UpdateUserCommand } from '../command/updateUserCommand'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new RegisterUserCommand(req.body)
    await command.validate()
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const command = new UpdateUserCommand({
      userId: req.auth?.id,
      username: req.body.username
    })
    await command.validate()
    await command.handle()
    next()
  } catch (error: unknown) {
    next(error)
  }
}
