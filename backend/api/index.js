// Load environment (helpful for local testing; Vercel injects env vars at runtime)
// Simple serverless entry for Vercel: import and export the Express app
// Load local env when testing locally (Vercel provides env in production)
// const serverless = require('serverless-http');
// require('dotenv').config()
const app = require('../app')

// Do not require non-existent local DB helper here — let the app handle DB
// connection. Export the app so Vercel can mount it as a serverless function.
module.exports = app
