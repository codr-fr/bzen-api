import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config({ override: true })
dotenvExpand.expand(env)

import http from 'http'
import app from './app'
import { getAccount, createAccount, creditAccount, debitAccount, transferBetweenAccounts } from './domain/account/controller'
import { registerUser, updateUser } from './domain/user/controller'
import { errorMiddleware } from './middlewares/exceptions'
import { successMiddleware } from './middlewares/success'

// App routes
app.get('/api/account/:uuid', getAccount)
app.post('/api/account', createAccount)
app.post('/api/account/credit', creditAccount)
app.post('/api/account/debit', debitAccount)
app.post('/api/account/transfer', transferBetweenAccounts)

app.post('/api/user', registerUser)
app.post('/api/user/edit', updateUser)

// Define after all routes
app.use(successMiddleware)
app.use(errorMiddleware)

// Server port
const port = process.env.API_PORT || '3000'
app.set('port', port)

// Create and configure server
const server = http.createServer(app)

server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})

server.listen(port)

// Handle unhandled promise rejections and exceptions
process.on("unhandledRejection", (err: any) => {
    console.log(err)
})

process.on("uncaughtException", (err: any) => {
    console.log(err.message)
})


