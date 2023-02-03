import { Request, Response } from 'express'

export const successHandler = (request: Request, response: Response) => {
  response.status(200).json({
    message: 'It worked !'
  })
}
