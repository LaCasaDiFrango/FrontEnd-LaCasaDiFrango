// stores/useProdutoStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { produto, pedido } from '@/api/index'
import {useRouter} from 'vue-router'

export const useProdutoStore = defineStore('produto', () => {
  const produtoSelecionado = ref(null)
  const quantidade = ref(1)

  const produtoService = new produto.default()
  const pedidoService = new pedido.default()
  const router = useRouter()

  async function carregarProduto(id) {
    try {
      produtoSelecionado.value = await produtoService.getById(id)
    } catch (error) {
      console.error('Erro ao carregar produto:', error)
    }
  }

  function aumentar() {
    quantidade.value++
  }

  function diminuir() {
    if (quantidade.value > 1) {
      quantidade.value--
    }
  }

  async function criarPedido() {
    try {
      const response = await pedidoService.create({
        itens: [
          {
            produto: produtoSelecionado.value.id,
            quantidade: quantidade.value,
          },
        ],
        status: 'CARRINHO',
      })
      console.log('Pedido atualizado:', response)
      console.log('Quantidade de itens no pedido:', response.itens.length)
      alert('Produto adicionado ao pedido (carrinho)!')
      router.push('/pedidos')
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      alert('Erro ao adicionar produto ao pedido.')
    }
  }

  async function finalizarPedido(pedidoId) {
    try {
      const response = await pedidoService.finalizar(pedidoId)
      console.log('Pedido finalizado com sucesso!', response)
      alert('Pedido finalizado com sucesso!')
    } catch (error) {
      alert('Erro ao finalizar pedido.')
      console.error('Erro inesperado:', error)
    }
  }

  return {
    produtoSelecionado,
    quantidade,
    carregarProduto,
    aumentar,
    diminuir,
    criarPedido,
    finalizarPedido,
  }
})
