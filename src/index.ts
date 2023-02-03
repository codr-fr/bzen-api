import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config({ override: true })
dotenvExpand.expand(env)

import http from 'http'
import app from './app'
import { getAccount, createAccount, creditAccount, debitAccount, transferBetweenAccounts, attachAccountToUser, getUserAccounts } from './domain/account/controller'
import { registerUser, updateUser, loginUser } from './domain/user/controller'
import { error } from './middleware/error'
import { success } from './middleware/success'
import logger from './logger'

// App routes
app.get('/api/accounts/', getUserAccounts)

app.get('/api/account/:accountId', getAccount)
app.post('/api/account', createAccount)
app.post('/api/account/credit', creditAccount)
app.post('/api/account/debit', debitAccount)
app.post('/api/account/transfer', transferBetweenAccounts)
app.post('/api/account/attach', attachAccountToUser)

app.post('/api/user/register', registerUser)
app.post('/api/user/login', loginUser)
app.post('/api/user/edit', updateUser)

// Define after all routes
app.use(success)
app.use(error)

// Server port
const port = process.env.API_PORT || '3000'
app.set('port', port)

// Create and configure server
const server = http.createServer(app)

server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  logger.info(`Listening on ${bind}`)
  logger.alert('alert')
  logger.error('error')
  logger.crit('crit')
  logger.warn('warn')
})

server.listen(port)

// Handle unhandled promise rejections and exceptions
process.on('unhandledRejection', () => {
  return
  //console.log(err)
})

process.on('uncaughtException', () => {
  return
  //console.log(err.message)
})
