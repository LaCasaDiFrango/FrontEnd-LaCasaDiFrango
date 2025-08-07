import axios from 'axios'
import { Passage } from '@passageidentity/passage-js'
import { useAuthStore } from '@/stores/index'

const passage = new Passage(import.meta.env.VITE_PASSAGE_APP_ID)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:19003/api/',
})

api.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore()
    console.log('[DEBUG] authStore.isGuest:', authStore.isGuest)

    // Tenta pegar o token do localStorage diretamente
    const localToken = localStorage.getItem('psg_auth_token')
    if (localToken) {
      config.headers.Authorization = `Bearer ${localToken}`
      console.log('[DEBUG] Authorization header setado via localStorage')
      return config
    }

    // Se não há token salvo, trata o caso guest
    if (authStore.isGuest) {
      console.log('[DEBUG] Usuário é guest e sem token, removendo Authorization')
      delete config.headers.Authorization
      return config
    }

    // Caso não seja guest, tenta pegar o token via Passage
    try {
      const user = passage.getCurrentUser()
      console.log('[DEBUG] Passage.getCurrentUser():', user)

      const token = await user?.getAuthToken()
      console.log('[DEBUG] Token obtido:', token)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log('[DEBUG] Authorization header setado via Passage')
      } else {
        console.log('[DEBUG] Nenhum token encontrado via Passage, removendo Authorization')
        delete config.headers.Authorization
      }
    } catch (error) {
      console.error('[DEBUG] Erro ao obter token via Passage:', error)
      delete config.headers.Authorization
    }

    return config
  },
  (error) => {
    console.error('[DEBUG] Erro no interceptor axios:', error)
    return Promise.reject(error)
  }
)

export default api
