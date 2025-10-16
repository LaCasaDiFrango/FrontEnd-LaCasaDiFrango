// stores/usuarios.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user } from '@/api/index'

export const useUsuariosStore = defineStore('usuarios', () => {
  const userService = new user.default()
  const usuarios = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchUsuarios() {
    loading.value = true
    error.value = null
    try {
      const data = await userService.getAll()
      usuarios.value = data.results || data
    } catch (err) {
      console.error('[UsuariosStore] Erro:', err)
      error.value = 'Erro ao carregar usuários.'
    } finally {
      loading.value = false
    }
  }

  async function cadastrarUsuario(usuarioData) {
    try {
      const response = await userService.create(usuarioData)
      usuarios.value.push(response)
      return response
    } catch (err) {
      console.error('[UsuariosStore] Erro ao cadastrar usuário:', err)
      throw err
    }
  }

  return { usuarios, loading, error, fetchUsuarios, cadastrarUsuario }
})
