import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pedido } from '@/api/index'

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidoService = new pedido.default()

  // =============================
  // 📌 LISTAGEM PAGINADA
  // =============================
  const pedidos = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const itemsPerPage = ref(10)
  const loading = ref(false)
  const error = ref(null)

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
    } finally {
      loading.value = false
    }
  }

  function setCurrentPage(page) {
    if (page > 0 && page <= totalPages.value && page !== currentPage.value) {
      fetchPedidos(page)
    }
  }

  async function updatePedido(id, data) {
    try {
      const updated = await pedidoService.update(id, data)
      const index = pedidos.value.findIndex(p => p.id === id)
      if (index !== -1) pedidos.value[index] = updated
    } catch (err) {
      console.error('[PedidosStore] Erro ao atualizar pedido:', err)
      throw err
    }
  }

  // =============================
  // 📌 ÚLTIMOS 7 DIAS (quantidade de pedidos)
  // =============================
  const ultimos7Dias = ref([])
  const loadingGraficoQuantidade = ref(false)
  const errorGraficoQuantidade = ref(null)

  async function fetchUltimos7Dias() {
    loadingGraficoQuantidade.value = true
    errorGraficoQuantidade.value = null

    try {
      const data = await pedidoService.ultimosPedidos()

      const hoje = new Date()
      const dias = []

      // garante 7 dias preenchidos
      for (let i = 6; i >= 0; i--) {
        const dia = new Date()
        dia.setDate(hoje.getDate() - i)
        const diaStr = dia.toISOString().split('T')[0]

        const achado = data.find(d => d.dia === diaStr)

        dias.push({
          dia: diaStr,
          total: achado ? achado.total : 0
        })
      }

      ultimos7Dias.value = dias
    } catch (err) {
      console.error('[PedidosStore] Erro ao buscar últimos 7 dias:', err)
      errorGraficoQuantidade.value = 'Erro ao carregar dados.'
      ultimos7Dias.value = []
    } finally {
      loadingGraficoQuantidade.value = false
    }
  }

  // =============================
  // 💰 FATURAMENTO DOS ÚLTIMOS 7 DIAS (valor vendido por dia)
  // =============================
  const vendasUltimos7Dias = ref([])
  const loadingGraficoVendas = ref(false)
  const errorGraficoVendas = ref(null)

  async function fetchVendasUltimos7Dias() {
    loadingGraficoVendas.value = true
    errorGraficoVendas.value = null

    try {
      const data = await pedidoService.vendasUltimos7Dias()

      // backend já retorna exatamente 7 dias
      vendasUltimos7Dias.value = data.map(item => ({
        dia: item.dia,
        total_vendido: item.total_vendido
      }))
    } catch (err) {
      console.error('[PedidosStore] Erro ao buscar faturamento 7 dias:', err)
      errorGraficoVendas.value = 'Erro ao carregar faturamento.'
      vendasUltimos7Dias.value = []
    } finally {
      loadingGraficoVendas.value = false
    }
  }

  // =============================
  // 💵 TOTAL DE VENDAS GERAL
  // =============================
  const totalVendas = ref(0)

  async function fetchTotalVendas() {
    try {
      totalVendas.value = await pedidoService.totalVendas()
    } catch {
      totalVendas.value = 0
    }
  }

  async function deletePedido(id) {
  try {
    await pedidoService.delete(id)
    pedidos.value = pedidos.value.filter(p => p.id !== id)
  } catch (err) {
    console.error('[PedidosStore] Erro ao deletar pedido:', err)
    throw err
  }
}

  // =============================
  // EXPORTAR PARA O COMPONENTE
  // =============================
  return {
    pedidos,
    loading,
    error,
    fetchPedidos,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    updatePedido,
    deletePedido,
    // quantidade últimos 7 dias
    ultimos7Dias,
    loadingGraficoQuantidade,
    errorGraficoQuantidade,
    fetchUltimos7Dias,

    // faturamento últimos 7 dias (gráfico novo)
    vendasUltimos7Dias,
    loadingGraficoVendas,
    errorGraficoVendas,
    fetchVendasUltimos7Dias,

    // total de vendas
    totalVendas,
    fetchTotalVendas
  }
})
