import axios from 'axios'

// In production, API calls will be made to the same domain
const apiUrl = import.meta.env.PROD 
  ? '/api'  // Production: use relative path
  : import.meta.env.VITE_API_URL // Development: use full URL

export default axios.create({
  baseURL: apiUrl,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
})
