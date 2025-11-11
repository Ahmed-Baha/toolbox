// Load environment (helpful for local testing; Vercel injects env vars at runtime)
require('dotenv').config()

const app = require('./src/app')
const { connect } = require('../src/config/db')

// Try to connect to MongoDB when the function is initialized in serverless.
// We don't throw here — if the connection isn't ready, route handlers should
// handle DB errors gracefully. This ensures the connection is attempted
// on cold-starts in Vercel serverless functions.
const MONGODB_URI = process.env.MONGODB_URI
if (MONGODB_URI) {
	connect(MONGODB_URI)
		.then(() => console.log('Connected to MongoDB (serverless init)'))
		.catch(err => console.error('MongoDB connection error (serverless init):', err))
} else {
	console.warn('MONGODB_URI not set — backend will not connect to DB')
}

module.exports = app