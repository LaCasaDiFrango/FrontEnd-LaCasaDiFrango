// src/stores/pedido.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pedido } from '@/api/index'

export const usePedidoStore = defineStore('pedido', () => {
  const pedidos = ref([])
  const pedidoAtual = ref(null)
  const pedidoService = new pedido.default()

  async function carregarPedidos() {
    try {
      pedidos.value = await pedidoService.list()
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
    finalizarPedido,
  }
})
