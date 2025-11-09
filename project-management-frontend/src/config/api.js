// API configuration
// Use relative path for Vercel deployment, falls back to localhost for development
const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

export default API_URL;
