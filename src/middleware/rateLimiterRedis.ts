import { NextFunction, Request, Response } from 'express'
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: parseInt(process.env.RATE_LIMIT_POINTS || '50'), // How many requests
  duration: parseInt(process.env.RATE_LIMIT_DURATION || '10') // For how many times
})

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next()
    })
    .catch((result: RateLimiterRes) => {
      const headers = {
        'Retry-After': result.msBeforeNext / 1000,
        'X-RateLimit-Limit': rateLimiter.points,
        'X-RateLimit-Remaining': result.remainingPoints,
        'X-RateLimit-Reset': new Date(Date.now() + result.msBeforeNext).toISOString()
      }

      res.header(headers).status(429).send('Too Many Requests')
    })
}

export default rateLimiterMiddleware
