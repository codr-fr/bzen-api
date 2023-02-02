import { NextFunction, Request, Response } from "express"

export const success = (request: Request, response: Response, next: NextFunction) => {
    response
        .status(200)
        .send({
            message: 'It worked !'
        })
}