import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pedido } from '@/api/index'

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidoService = new pedido.default()

  // pedidos normais paginados
  const pedidos = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const itemsPerPage = ref(10)
  const loading = ref(false)
  const error = ref(null)

  // dados para gráfico últimos 7 dias
  const ultimos7Dias = ref([])
  const loadingGrafico = ref(false)
  const errorGrafico = ref(null)

  // fetch paginado
  async function fetchPedidos(page = 1) {
    loading.value = true
    error.value = null
    try {
      const raw = await pedidoService.getAll({ page, page_size: itemsPerPage.value })
      const response = raw && raw.data !== undefined ? raw.data : raw

      if (response && response.results !== undefined) {
        pedidos.value = response.results
        currentPage.value = response.page ?? page
        totalPages.value = response.total_pages ?? 1
      } else if (Array.isArray(response)) {
        pedidos.value = response
        currentPage.value = page
        totalPages.value = 1
      } else {
        pedidos.value = []
        currentPage.value = 1
        totalPages.value = 1
      }
    } catch (err) {
      console.error('[PedidosStore] Erro ao buscar pedidos:', err)
      error.value = 'Erro ao carregar pedidos.'
      pedidos.value = []
      currentPage.value = 1
      totalPages.value = 1
    } finally {
      loading.value = false
    }
  }

  // fetch para gráfico últimos 7 dias
  async function fetchUltimos7Dias() {
    loadingGrafico.value = true
    errorGrafico.value = null
    try {
      const data = await pedidoService.ultimosPedidos()
      // Garantir que o array tenha 7 dias, mesmo que alguns estejam zerados
      const hoje = new Date()
      const dias = []
      for (let i = 6; i >= 0; i--) {
        const dia = new Date()
        dia.setDate(hoje.getDate() - i)
        const diaStr = dia.toISOString().split('T')[0] // YYYY-MM-DD
        const achado = data.find(d => d.dia === diaStr)
        dias.push({
          dia: diaStr,
          total: achado ? achado.total : 0
        })
      }
      ultimos7Dias.value = dias
    } catch (err) {
      console.error('[PedidosStore] Erro ao buscar últimos 7 dias:', err)
      errorGrafico.value = 'Erro ao carregar gráfico de pedidos.'
      ultimos7Dias.value = []
    } finally {
      loadingGrafico.value = false
    }
  }

  function setCurrentPage(page) {
    if (page > 0 && page <= totalPages.value && page !== currentPage.value) {
      fetchPedidos(page)
    }
  }

  return {
    pedidos,
    loading,
    error,
    fetchPedidos,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,

    ultimos7Dias,
    loadingGrafico,
    errorGrafico,
    fetchUltimos7Dias
  }
})
