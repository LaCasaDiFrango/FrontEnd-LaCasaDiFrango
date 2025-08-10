import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pedido } from '@/api/index'

export const usePedidoStore = defineStore('pedido', () => {
  const pedidos = ref([])
  const pedidoAtual = ref(null)
  const pedidoService = new pedido.default()

  const statusMap = {
    'Carrinho': 1,
    'Realizado': 2,
    'Pago': 3,
    'Entregue': 4
  }

  function normalizarPedido(p) {
    if (!p) return null
    return {
      ...p,
      status: typeof p.status === 'string' ? statusMap[p.status] || p.status : p.status,
      finalizado: p.finalizado ?? false
    }
  }

  async function carregarPedidos() {
    try {
      const lista = await pedidoService.getAll()
      pedidos.value = lista.map(normalizarPedido)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    }
  }

  async function carregarPedidoAtual() {
    try {
      const todosPedidos = (await pedidoService.getAll()).map(normalizarPedido)
      pedidoAtual.value = todosPedidos.find(p => !p.finalizado && p.status === 1) || null
    } catch (error) {
      console.error('Erro ao carregar pedido atual:', error)
    }
  }

  async function carregarPedidoPorCodigo(codigo) {
    try {
      const pedidoBuscado = normalizarPedido(await pedidoService.getById(codigo))
      pedidoAtual.value = pedidoBuscado
      return pedidoBuscado
    } catch (error) {
      console.error('Erro ao carregar pedido:', error)
      pedidoAtual.value = null
      throw error
    }
  }

async function criarPedido(dados) {
  try {
    console.debug('[DEBUG criarPedido] Dados enviados:', dados)
    const novoPedido = await pedidoService.create(dados)
    console.debug('[DEBUG criarPedido] Resposta do servidor:', novoPedido)
    pedidoAtual.value = novoPedido
    return novoPedido
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    if (error.response) {
      console.error('[DEBUG criarPedido] Erro status:', error.response.status)
      console.error('[DEBUG criarPedido] Erro data:', error.response.data)
    }
    throw error
  }
}



  async function atualizarStatusPedido(id, novoStatus) {
    try {
      const statusNum = typeof novoStatus === 'string' ? statusMap[novoStatus] : novoStatus
      const dadosAtualizados = { status: statusNum }
      console.log('Enviando dados para update:', dadosAtualizados)

      const pedidoAtualizado = normalizarPedido(await pedidoService.update(id, dadosAtualizados))

      if (pedidoAtualizado.status !== statusMap['Carrinho']) {
        pedidoAtual.value = null
      } else {
        pedidoAtual.value = pedidoAtualizado
      }
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
    criarPedido,
    atualizarStatusPedido,
    finalizarPedido,
  }
})
