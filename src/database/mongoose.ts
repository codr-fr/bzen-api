import mongoose, { connect, Connection } from 'mongoose'

mongoose.set('strictQuery', false)

const MONGO_URI = process.env.MONGO_URI || "mongodb://username:password@127.0.0.1/database"

if (!MONGO_URI) {
    throw new Error(
        'Please define the MONGO_URI environment variable inside .env'
    )
}

declare global {
    var mongoose: any
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function db (): Promise<Connection> {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = connect(MONGO_URI).then(mongoose => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default db