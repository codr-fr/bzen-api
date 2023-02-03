import mongoose, { Mongoose } from 'mongoose'
import logger from '../logger'

mongoose.set('strictQuery', false)

const MONGO_URI = process.env.MONGO_URI || 'mongodb://username:password@127.0.0.1/database'

if (!MONGO_URI) {
  const message = 'Please define the MONGO_URI environment variable inside .env'
  logger.crit(message)
  throw new Error(message)
}

declare let global: typeof globalThis & {
  cached: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  }
}

type CachedType = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: CachedType = global.cached
if (!cached) {
  cached = global.cached = { conn: null, promise: null }
}

export default async function db() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
