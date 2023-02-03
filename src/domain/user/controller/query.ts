import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../../../database/mongoose'
import jwt from 'jsonwebtoken'
import { LoginUserCommand } from '../command/loginUserCommand'
import { findUserByUsername } from '../repository'
import logger from '../../../logger'

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  await db()

  logger.info('loginuser')

  let command: LoginUserCommand

  try {
    command = new LoginUserCommand(req.body)
  } catch (error) {
    return next(error)
  }

  const user = await findUserByUsername(command.username)

  if (user === undefined) {
    //console.error(`user not found`)
    return next(new Error(`Can't login`))
  }

  if (!bcrypt.compareSync(command.password, user.password)) {
    //console.error(`password do no match`)
    return next(new Error(`Can't login`))
  }

  const tokenOptions: jwt.SignOptions = {
    algorithm: <jwt.Algorithm>process.env.JWT_ALGORITH || 'HS256',
    expiresIn: process.env.JWT_TTL || '1h'
  }

  const token = jwt.sign(user.toObject(['password']), String(process.env.JWT_SECRET), tokenOptions)

  res.status(200).json({ token })
}
