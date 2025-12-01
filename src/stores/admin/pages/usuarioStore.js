import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user } from '@/api/index'

export const useUsuariosStore = defineStore('usuarios', () => {
  const userService = new user.default()

  // Lista de usuários
  const usuarios = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const itemsPerPage = ref(10)
  const loading = ref(false)
  const error = ref(null)

  // Gráfico de ativos/inativos
  const ativos = ref(0)
  const inativos = ref(0)
  const loadingGrafico = ref(false)
  const errorGrafico = ref(null)

  // Gráfico top usuários
  const topUsuarios = ref([])
  const loadingTopUsuarios = ref(false)
  const errorTopUsuarios = ref(null)

  // ==========================
  // Funções de usuários
  // ==========================
  async function fetchUsuarios(page = 1) {
    loading.value = true
    error.value = null
    try {
      const raw = await userService.getAll({ page, page_size: itemsPerPage.value })
      const response = raw && raw.data !== undefined ? raw.data : raw

      if (response && response.results !== undefined) {
        usuarios.value = response.results
        currentPage.value = response.page ?? page
        totalPages.value = response.total_pages ?? 1
      } else if (Array.isArray(response)) {
        usuarios.value = response
        currentPage.value = page
        totalPages.value = 1
      } else {
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

  async function fetchUsuariosAtivosInativos() {
    loadingGrafico.value = true
    errorGrafico.value = null
    try {
      const response = await userService.ativosInativos()
      ativos.value = response.ativos ?? 0
      inativos.value = response.inativos ?? 0
    } catch (err) {
      console.error('[UsuariosStore] Erro ao buscar ativos/inativos:', err)
      errorGrafico.value = 'Erro ao carregar dados do gráfico.'
    } finally {
      loadingGrafico.value = false
    }
  }

  // ==========================
  // Função para top 10 usuários mais ativos
  // ==========================
  async function fetchTopUsuarios() {
    loadingTopUsuarios.value = true
    errorTopUsuarios.value = null
    try {
      const response = await userService.maisAtivos() // chama o endpoint /usuarios/mais_ativos/
      topUsuarios.value = response
    } catch (err) {
      console.error('[UsuariosStore] Erro ao buscar top usuários:', err)
      errorTopUsuarios.value = 'Erro ao carregar dados do gráfico de top usuários.'
    } finally {
      loadingTopUsuarios.value = false
    }
  }

  async function updateUsuario(id, data) {
  try {
    const updated = await userService.update(id, data) // implementa endpoint PATCH/PUT
    const index = usuarios.value.findIndex(u => u.id === id)
    if (index !== -1) {
      usuarios.value[index] = updated
    }
  } catch (err) {
    console.error('[UsuariosStore] Erro ao atualizar usuário:', err)
    throw err
  }
}

async function deleteUsuario(id) {
  try {
    await userService.delete(id)
    usuarios.value = usuarios.value.filter(u => u.id !== id)
  } catch (err) {
    console.error('[UsuariosStore] Erro ao deletar usuário:', err)
    throw err
  }
}



  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    cadastrarUsuario,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    updateUsuario,
    deleteUsuario,
    // gráfico ativos/inativos
    ativos,
    inativos,
    loadingGrafico,
    errorGrafico,
    fetchUsuariosAtivosInativos,
    // gráfico top usuários
    topUsuarios,
    loadingTopUsuarios,
    errorTopUsuarios,
    fetchTopUsuarios
  }
})
