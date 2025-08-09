import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pedido } from '@/api/index'

export const usePedidoStore = defineStore('pedido', () => {
  const pedidos = ref([])
  const pedidoAtual = ref(null)
  const pedidoService = new pedido.default()

  async function carregarPedidos() {
    try {
      pedidos.value = await pedidoService.getAll()
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    }
  }

  async function carregarPedidoAtual() {
    try {
      const todosPedidos = await pedidoService.getAll()
      pedidoAtual.value = todosPedidos.find(p => !p.finalizado) || null
    } catch (error) {
      console.error('Erro ao carregar pedido atual:', error)
    }
  }

  // Novo: carregar pedido por id ou codigo
  async function carregarPedidoPorCodigo(codigo) {
    try {
      const pedidoBuscado = await pedidoService.getById(codigo) // ou getById se tiver
      pedidoAtual.value = pedidoBuscado
      return pedidoBuscado
    } catch (error) {
      console.error('Erro ao carregar pedido:', error)
      pedidoAtual.value = null
      throw error
    }
  }

  // Novo: atualizar status do pedido
  async function atualizarStatusPedido(id, novoStatus) {
    try {
      const atualizado = await pedidoService.atualizarStatus(id, novoStatus)
      if (pedidoAtual.value && pedidoAtual.value.id === id) {
        pedidoAtual.value.status = novoStatus
      }
      return atualizado
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error)
      throw error
    }
  }

  async function finalizarPedido(id) {
    try {
      await pedidoService.finalizar(id)
      pedidoAtual.value = null
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      throw error
    }
  }

  return {
    pedidos,
    pedidoAtual,
    carregarPedidos,
    carregarPedidoAtual,
    carregarPedidoPorCodigo,
    atualizarStatusPedido,
    finalizarPedido,
  }
})
