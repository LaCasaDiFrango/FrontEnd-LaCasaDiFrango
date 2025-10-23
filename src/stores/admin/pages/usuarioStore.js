import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user } from '@/api/index'
import { handlePaginatedResponse } from '@/helpers/pagination'

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
    const raw = await userService.getAll({ page, page_size: itemsPerPage.value })
    const response = raw && raw.data !== undefined ? raw.data : raw

    console.log('[UsuariosStore] raw resposta:', raw)
    console.log('[UsuariosStore] parsed response:', response)

    if (response && response.results !== undefined) {
      usuarios.value = response.results
      currentPage.value = response.page ?? page
      totalPages.value = response.total_pages ?? 1
    } else if (Array.isArray(response)) {
      usuarios.value = response
      currentPage.value = page
      totalPages.value = 1
    } else {
      console.warn('[UsuariosStore] Formato inesperado:', response)
      usuarios.value = []
      currentPage.value = 1
      totalPages.value = 1
    }
  } catch (err) {
    console.error('[UsuariosStore] Erro ao buscar usuários:', err)
    error.value = 'Erro ao carregar usuários.'
  } finally {
    loading.value = false
  }
}


  function setCurrentPage(page) {
    if (page > 0 && page <= totalPages.value && page !== currentPage.value) {
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
