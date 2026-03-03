import axios from 'axios';

if (!import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
  throw new Error('Missing VITE_API_URL. Set it in Vercel project environment variables.');
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;