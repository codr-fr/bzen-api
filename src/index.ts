import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config({ override: true })
dotenvExpand.expand(env)

import http from 'http'
import app from './app'
import { errorHandler } from './middleware/error'
import { successHandler } from './middleware/success'
import logger from './framework/logger'
import router from './framework/router'

// App routes
app.use('/api', router)

// Define after all routes
app.use(successHandler)
app.use(errorHandler)

// Server port
const port = process.env.API_PORT || '3000'
app.set('port', port)

// Create and configure server
const server = http.createServer(app)

server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  logger.info(`Listening on ${bind}`)
})

server.listen(port)

// Handle unhandled promise rejections and exceptions
process.on('unhandledRejection', (err) => {
  logger.crit(`Unhandled Rejection: ${err}`)
})

process.on('uncaughtException', (err, origin) => {
  logger.crit(`Uncaught exception: ${err}`)
  logger.crit(`Exception origin: ${origin}`)
})
