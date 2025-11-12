// Load environment
require('dotenv').config()

// Simple serverless entry for Vercel: import and export the Express app
const app = require('../app')

// Export the app so Vercel can mount it as a serverless function
module.exports = app