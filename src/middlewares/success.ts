import { NextFunction, Request, Response } from "express"

export const successMiddleware = (request: Request, response: Response, next: NextFunction) => {
    response
        .status(200)
        .send({
            message: 'It worked !'
        })
}