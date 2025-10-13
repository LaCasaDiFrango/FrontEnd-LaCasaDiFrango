import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pedido } from '@/api/index'

export const usePedidosStore = defineStore('pedidos', () => {
  const pedidoService = new pedido.default()
  const pedidos = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchPedidos() {
    loading.value = true
    error.value = null
    try {
      const data = await pedidoService.getAll()
      pedidos.value = data.results || data
    } catch (err) {
      console.error('[PedidosStore] Erro:', err)
      error.value = 'Erro ao carregar pedidos.'
    } finally {
      loading.value = false
    }
  }

  return { pedidos, loading, error, fetchPedidos }
})
