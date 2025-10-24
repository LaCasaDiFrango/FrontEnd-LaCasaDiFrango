import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pedido } from '@/api/index'
import { handlePaginatedResponse } from '@/helpers/pagination'

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidoService = new pedido.default()
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
    // Enviar page_size que seu backend espera
    const raw = await pedidoService.getAll({ page, page_size: itemsPerPage.value })

    // Se o pedidoService usa axios, a resposta real pode estar em raw.data
    const response = raw && raw.data !== undefined ? raw.data : raw

    console.log('[PedidosStore] raw resposta:', raw)
    console.log('[PedidosStore] parsed response:', response)

    if (response && response.results !== undefined) {
      pedidos.value = response.results
      currentPage.value = response.page ?? page
      totalPages.value = response.total_pages ?? 1
    } else if (Array.isArray(response)) {
      pedidos.value = response
      currentPage.value = page
      totalPages.value = 1
    } else {
      console.warn('[PedidosStore] Formato inesperado:', response)
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


  function setCurrentPage(page) {
    if (page > 0 && page <= totalPages.value && page !== currentPage.value) {
      fetchPedidos(page)
    }
  }

  return { pedidos, loading, error, fetchPedidos, currentPage, totalPages, itemsPerPage, setCurrentPage }
})
