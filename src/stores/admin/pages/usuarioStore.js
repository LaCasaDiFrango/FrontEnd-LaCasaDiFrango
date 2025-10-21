import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user } from '@/api/index'

export const useUsuariosStore = defineStore('usuarios', () => {
  const userService = new user.default()
  const usuarios = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const itemsPerPage = ref(10)
  const loading = ref(false)
  const error = ref(null)

  async function fetchUsuarios(page = 1) {
    loading.value = true
    error.value = null
    try {
      const data = await userService.getAll({ page, limit: itemsPerPage.value })
      usuarios.value = data.results
      currentPage.value = data.page
      totalPages.value = data.total_pages
    } catch (err) {
      console.error('[UsuariosStore] Erro:', err)
      error.value = 'Erro ao carregar usuários.'
    } finally {
      loading.value = false
    }
  }

  function setCurrentPage(page) {
    // Apenas atualiza se a página for válida e diferente da atual
    if (page > 0 && page <= totalPages.value && page !== currentPage.value) {
      currentPage.value = page
      fetchUsuarios(page)
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

  return { usuarios, loading, error, fetchUsuarios, cadastrarUsuario, currentPage, totalPages, itemsPerPage, setCurrentPage }
})