import express, { json, urlencoded } from 'express'
import { expressjwt } from 'express-jwt'
import jwt from 'jsonwebtoken'
import { cors } from './middleware/cors'
import morgan from 'morgan'
import fs from 'fs'
import compression from 'compression'
import helmet from 'helmet'
import rateLimiterRedisMiddleware from './middleware/rateLimiterRedis'

const app = express()

// setup the logger
/*
app.use((req, res, next) => {
  req.id = v4()
  next()
})
*/
app.use(rateLimiterRedisMiddleware)
app.use(compression())
app.use(helmet())

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    }
  })
)

app.use(
  morgan('combined', {
    stream: fs.createWriteStream('./logs/access.log', { flags: 'a' })
  })
)

app.use(
  morgan('combined', {
    stream: fs.createWriteStream('./logs/error.log', { flags: 'a' }),
    skip: function (req, res) {
      return res.statusCode < 400
    }
  })
)

app.use(json()) // for application/json
app.use(urlencoded({ extended: true })) //for application/xwww-
app.use(cors)
app.use(
  expressjwt({
    secret: String(process.env.JWT_SECRET),
    algorithms: [<jwt.Algorithm>process.env.JWT_ALGORITH || 'HS256']
  }).unless({ path: ['/api/user/register', '/api/user/login'] })
)

export default app
