import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // MongoDB connection pool optimization - performance improvement
    const opts = {
      bufferCommands: false, // Mongoose buffering o'chirilgan (performance)
      maxPoolSize: 10, // Maksimal connection pool size
      minPoolSize: 2, // Minimal connection pool size
      maxIdleTimeMS: 30000, // 30 soniyadan keyin idle connection yopiladi
      serverSelectionTimeoutMS: 5000, // Server selection timeout (5 soniya)
      socketTimeoutMS: 45000, // Socket timeout (45 soniya)
      connectTimeoutMS: 10000, // Connection timeout (10 soniya)
    }

    cached.promise = mongoose.connect(MONGO_URL, opts).then(mongoose => {
      return mongoose
    })
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('connected')
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
