import { Request, Response } from 'express'

export const success = (_: Request, response: Response) => {
  response.status(200).send({
    message: 'It worked !'
  })
}
