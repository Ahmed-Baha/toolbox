import axios from 'axios'

// In production, API calls will be made to the same domain
// In development, use the full backend URL with /api appended
const apiUrl = import.meta.env.PROD 
  ? '/api'  // Production: use relative path (same domain)
  : `${import.meta.env.VITE_API_URL || 'http://localhost:3003'}/api` // Development: full URL + /api

export default axios.create({
  baseURL: apiUrl,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
})
