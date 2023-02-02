import { NextFunction, Request, Response } from "express"

export const error = (error: Error, request: Request, response: Response, next: NextFunction) => {
    const message = error.message || 'Something went wrong'
    response
        .status(500)
        .send({
            message,
        })
}