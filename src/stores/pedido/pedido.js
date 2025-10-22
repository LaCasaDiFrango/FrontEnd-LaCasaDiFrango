import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pedido } from '@/api/index'
import { useToastStore, useAuthStore } from '@/stores/index'

export const usePedidoStore = defineStore('pedido', () => {
  const pedidos = ref([])
  const pedidoAtual = ref(null)
  const pedidoService = new pedido.default()
  const toast = useToastStore()

  const statusMap = { 'Carrinho': 1, 'Realizado': 2, 'Pago': 3, 'Entregue': 4 }
  const statusMapInverse = { 1: 'Carrinho', 2: 'Realizado', 3: 'Pago', 4: 'Entregue' }

  function normalizarPedido(p) {
    if (!p) return null
    const statusNum = typeof p.status === 'string' ? statusMap[p.status] || p.status : p.status
    return { ...p, status: statusNum, statusNome: statusMapInverse[statusNum] || statusNum, finalizado: p.finalizado ?? false }
  }

  function calcularTotal(pedido) {
    if (!pedido || !pedido.itens) return 0
    return pedido.itens.reduce((acc, i) => acc + i.quantidade * (i.produto?.preco || 0), 0)
  }

  async function carregarPedidos() {
    try {
      const lista = await pedidoService.getAll()
      pedidos.value = lista.map(p => {
        const norm = normalizarPedido(p)
        norm.total = calcularTotal(norm)
        return norm
      })
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
      toast.error('Erro ao carregar pedidos.')
    }
  }

  async function carregarPedidoAtual() {
    const authStore = useAuthStore()
    const authUser = authStore.user

    try {
      const todosPedidos = (await pedidoService.getAll()).map(p => {
        const norm = normalizarPedido(p)
        norm.total = calcularTotal(norm)
        return norm
      })

      const meusPedidos = todosPedidos.filter(p => {
        const usuario = p.usuario
        if (typeof usuario === 'string') return usuario === authUser.email
        if (usuario && typeof usuario === 'object') return usuario.id === authUser.id || usuario.email === authUser.email
        return false
      })

      pedidoAtual.value = meusPedidos.find(p => !p.finalizado && p.status === 1) || null
    } catch (error) {
      console.error('Erro ao carregar pedido atual:', error)
      toast.error('Erro ao carregar pedido atual.')
    }
  }

  async function carregarPedidoPorCodigo(codigo) {
    try {
      const pedidoBuscado = normalizarPedido(await pedidoService.getById(codigo))
      pedidoBuscado.total = calcularTotal(pedidoBuscado)
      pedidoAtual.value = pedidoBuscado
      return pedidoBuscado
    } catch (error) {
      console.error('Erro ao carregar pedido:', error)
      pedidoAtual.value = null
      toast.error('Erro ao carregar pedido.')
      throw error
    }
  }

  async function criarPedido(dados) {
    try {
      const novoPedido = await pedidoService.create(dados)
      novoPedido.total = calcularTotal(novoPedido)
      pedidoAtual.value = novoPedido
      toast.success('Pedido criado com sucesso!')
      return novoPedido
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      toast.error('Erro ao criar pedido. Tente novamente.')
      throw error
    }
  }

  async function atualizarStatusPedido(id, novoStatus) {
    try {
      const statusNum = typeof novoStatus === 'string' ? statusMap[novoStatus] : novoStatus
      const dadosAtualizados = { status: statusNum }
      const pedidoAtualizado = normalizarPedido(await pedidoService.update(id, dadosAtualizados))
      pedidoAtualizado.total = calcularTotal(pedidoAtualizado)

      if (pedidoAtualizado.status !== statusMap['Carrinho']) {
        pedidoAtual.value = null
        toast.success(`Pedido atualizado para ${statusMapInverse[statusNum]}`)
      } else {
        pedidoAtual.value = pedidoAtualizado
      }
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error)
      toast.error('Erro ao atualizar status do pedido.')
      throw error
    }
  }

  async function finalizarPedido(id) {
    try {
      await pedidoService.finalizar(id)
      pedidoAtual.value = null
      toast.success('Pedido finalizado com sucesso!')
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      toast.error('Erro ao finalizar pedido.')
      throw error
    }
  }

  async function removerItemDoPedido(pedidoId, produtoId) {
    if (!pedidoId || !produtoId) {
      toast.error('Pedido ou produto inválido.')
      return
    }

    try {
      await pedidoService.removerItem(pedidoId, produtoId)
      toast.success('Item removido com sucesso!')
      const pedidoAtualizado = normalizarPedido(await pedidoService.getById(pedidoId))
      pedidoAtualizado.total = calcularTotal(pedidoAtualizado)
      pedidoAtual.value = pedidoAtualizado
    } catch (err) {
      console.error('Erro ao remover item do pedido:', err)
      toast.error('Erro ao remover item do pedido.')
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
    removerItemDoPedido,
  }
})
