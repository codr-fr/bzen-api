import express, { json, urlencoded } from 'express'
import { expressjwt } from 'express-jwt'
import jwt from 'jsonwebtoken'
import { cors } from './middleware/cors'
import morgan from 'morgan'
import fs from 'fs'
import compression from 'compression'
import helmet from 'helmet'
import rateLimiterRedisMiddleware from './middleware/rateLimiterRedis'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

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
    algorithms: [<jwt.Algorithm>process.env.JWT_ALGORITHM || 'HS256']
  }).unless({ path: ['/api/user/register', '/api/user/login', /\/api-docs\/*/] })
)

const path = process.env.API_PATH || 'api'
const port = process.env.API_PORT || '3000'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'B-Zen API',
      version: '1.0.0'
    },
    servers: [
      {
        url: `{protocol}://{host}:{port}{basePath}`,
        description: 'API Server',
        variables: {
          protocol: {
            enum: ['http', 'https'],
            default: 'http'
          },
          host: {
            default: 'localhost'
          },
          port: {
            default: port
          },
          basePath: {
            default: path
          }
        }
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          //           # arbitrary name for the security scheme
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' //   # optional, arbitrary value for documentation purposes
        }
      }
    }
  },
  apis: ['./src/framework/router.ts', './src/domain/*/command/*.ts', './src/domain/*/router/*.ts']
}

const specs = swaggerJsdoc(options)

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    //explorer: true,
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css'
  })
)

export default app
