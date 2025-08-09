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

  async function carregarPedidoPorCodigo(codigo) {
    try {
      const pedidoBuscado = await pedidoService.getById(codigo)
      pedidoAtual.value = pedidoBuscado
      return pedidoBuscado
    } catch (error) {
      console.error('Erro ao carregar pedido:', error)
      pedidoAtual.value = null
      throw error
    }
  }

async function atualizarStatusPedido(id, novoStatus) {
  try {
    const statusMap = {
      'Carrinho': 1,
      'Realizado': 2,
      'Pago': 3,
      'Entregue': 4
    }
    const statusNum = typeof novoStatus === 'string' ? statusMap[novoStatus] : novoStatus
    const dadosAtualizados = { status: statusNum }
    console.log('Enviando dados para update:', dadosAtualizados)

    const pedidoAtualizado = await pedidoService.update(id, dadosAtualizados)
    pedidoAtual.value = pedidoAtualizado
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error)
    if (error.response) {
      console.error('Detalhes do erro:', error.response.data)
    }
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
