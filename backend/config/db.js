const mongoose = require('mongoose')

/**
 * Connect to MongoDB with connection reuse for serverless environments.
 * Throws if `uri` is falsy.
 */
async function connect(uri) {
    if (!uri) throw new Error('MONGODB_URI is required')

    // If already connected, return immediately
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        return mongoose
    }

    // Use a global promise to cache an ongoing connection across lambda invocations
    if (global.__mongoosePromise) {
        await global.__mongoosePromise
        return mongoose
    }

    // Create a new connection and cache the promise
    global.__mongoosePromise = mongoose.connect(uri)
    await global.__mongoosePromise
    return mongoose
}

module.exports = { connect }
