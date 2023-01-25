import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config({ override: true })
dotenvExpand.expand(env)

import http from 'http'
import app from './app'
import { events, createAccount } from './controllers/events'

const port = process.env.API_PORT || '3000'

app.set('port', port)
const server = http.createServer(app)

server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})

server.listen(port)

app.get('/api/events', events)
app.post('/api/account', createAccount)