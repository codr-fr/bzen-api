import express, { json, urlencoded } from 'express'
import { cors } from './middleware/cors'
//const bearerToken = require('express-bearer-token')
//const checkBearerToken = require('./middlewares/checkBearerToken')

const app = express()

app.use(json()) // for application/json
app.use(urlencoded({ extended: true })) //for application/xwww-
app.use(cors)
//app.use(bearerToken())
//app.use(checkBearerToken)

export default app