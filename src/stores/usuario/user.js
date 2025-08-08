// stores/user.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', {
  actions: {
    async updateUser(data) {
      const auth = useAuthStore()
      const token = auth.token

      const res = await axios.patch('/api/user', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Atualiza o usuário na auth store também
      auth.user = { ...auth.user, ...res.data }
      localStorage.setItem('user', JSON.stringify(auth.user))
    }
  }
})
