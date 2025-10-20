import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pedido } from '@/api/index'

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
      const response = await pedidoService.getAll({ page, limit: itemsPerPage.value })
      console.log('[PedidosStore] Resposta da API:', response)

      if (response && typeof response === 'object' && response.results !== undefined) {
        // Formato de resposta paginado (com results, page, total_pages)
        pedidos.value = response.results
        currentPage.value = response.page !== undefined ? response.page : page
        totalPages.value = response.total_pages !== undefined ? response.total_pages : 1
      } else if (Array.isArray(response)) {
        // Formato de resposta como array direto
        pedidos.value = response
        currentPage.value = page
        // Se a API retorna um array direto, e não informa total_pages, 
        // assumimos que este array é a página atual e não podemos determinar totalPages de forma confiável
        // A menos que a API tenha um header ou outro meio de informar o total de itens.
        // Por enquanto, vamos assumir que a paginação é controlada pelo backend e que este array é uma página.
        // Se a API retorna um array completo e o frontend precisa paginar, a lógica seria diferente.
        // Para este cenário, a paginação não será exibida se totalPages permanecer 1.
        // Se a API de pedidos realmente retorna 'total_pages' em algum lugar, precisamos saber onde.
        // Como o log mostra apenas um array, estamos tratando como tal.
        totalPages.value = 1; // Não é possível determinar totalPages de um array simples sem mais info da API
      } else {
        console.warn('[PedidosStore] Formato de resposta inesperado ou vazio:', response)
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
      currentPage.value = page
      fetchPedidos(page)
    }}
      // Caso especial para quando totalPages é 1 mas queremos tentar buscar uma página diferente
      // Isso pode acontecer se a API de pedidos não fornece totalPages e estamos 


  return { pedidos, loading, error, fetchPedidos, currentPage, totalPages, itemsPerPage, setCurrentPage }
})
