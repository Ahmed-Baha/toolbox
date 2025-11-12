// Serverless entry: export the Express app so Vercel can mount it.
// This file intentionally keeps initialization minimal.
require('dotenv').config()
const app = require('../app')

// Optionally attempt to connect to MongoDB on cold start. If MONGODB_URI is
// not set we log a warning and let request handlers manage DB errors.
const MONGODB_URI = process.env.MONGODB_URI
if (MONGODB_URI) {
	const mongoose = require('mongoose')
	mongoose.connect(MONGODB_URI)
		.then(() => console.log('Connected to MongoDB (serverless init)'))
		.catch(err => console.error('MongoDB connection error (serverless init):', err))
} else {
	console.warn('MONGODB_URI not set — backend will not connect to DB')
}

module.exports = app