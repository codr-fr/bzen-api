import express, { json, urlencoded } from 'express'
import { expressjwt } from 'express-jwt'
import jwt from 'jsonwebtoken'
import { cors } from './middleware/cors'

const app = express()

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
