import mongoose, { connect } from 'mongoose'
/**
 Source :
 https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
 **/

mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI || "mongodb://username:password@127.0.0.1/database"

if (!MONGO_URI) {
    throw new Error(
        'Please define the MONGO_URI environment variable inside .env'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function db () {
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

export default db;