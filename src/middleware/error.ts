import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  const message = error.message || 'Something went wrong'

  if (error.constructor.name === 'UnauthorizedError') {
    response.status(401)
  } else {
    response.status(400)
  }

  response.json({ message })
  next()
}
