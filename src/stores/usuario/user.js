// stores/user.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore, useAuthStore } from '@/stores/index' // import do toast

export const useUserStore = defineStore('user', {
  actions: {
    async updateUser(data) {
      const auth = useAuthStore()
      const toast = useToastStore() // instanciando toast
      const token = auth.token

      try {
        const res = await axios.patch('/api/user', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // Atualiza o usuário na auth store também
        auth.user = { ...auth.user, ...res.data }
        localStorage.setItem('user', JSON.stringify(auth.user))

        toast.success('Usuário atualizado com sucesso!')
      
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        toast.error('Falha ao atualizar usuário. Tente novamente.')
        throw error
      }
    }
  }
})
