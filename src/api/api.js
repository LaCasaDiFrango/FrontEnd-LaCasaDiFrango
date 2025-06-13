import axios from 'axios'

const api = axios.create({
  baseURL: 'http://0.0.0.0:19003/api', // URL do seu back-end no Render
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  if (config.url.includes('/login') || config.url.includes('/public')) {
    return config
  }
  
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api