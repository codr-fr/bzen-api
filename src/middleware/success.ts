import { Request, Response } from 'express'

export const success = (request: Request, response: Response) => {
  response.status(200).json({
    message: 'It worked !'
  })
}
