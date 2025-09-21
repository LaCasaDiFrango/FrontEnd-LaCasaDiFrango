// stores/useProdutoStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { produto, pedido } from '@/api/index'
import { usePedidoStore, useToastStore } from '@/stores/index'
import { useRouter } from 'vue-router'

export const useProdutoStore = defineStore('produto', () => {
  const produtoSelecionado = ref(null)
  const quantidade = ref(1)

  const produtoService = new produto.default()
  const pedidoService = new pedido.default()
  const router = useRouter()
  const toast = useToastStore() // instanciando a store de toast

  async function carregarProduto(id) {
    try {
      produtoSelecionado.value = await produtoService.getById(id)
    } catch (error) {
      console.error('Erro ao carregar produto:', error)
      toast.error('Erro ao carregar o produto!')
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
      const dadosParaEnviar = {
        itens: [
          {
            produto: produtoSelecionado.value.id,
            quantidade: quantidade.value,
          },
        ],
        status: 1, // "Carrinho"
      }

      console.log('[DEBUG criarPedido] Dados enviados para criação:', JSON.stringify(dadosParaEnviar, null, 2))

      const response = await pedidoService.create(dadosParaEnviar)
      console.log('[DEBUG criarPedido] Resposta da API:', response)

      const pedidoStore = usePedidoStore()
      pedidoStore.pedidoAtual = response

      toast.success(`${produtoSelecionado.value.nome} adicionado ao pedido!`)
      router.push('/home/pedidos')
    } catch (error) {
      if (error.response) {
        console.error('[DEBUG criarPedido] Erro da API:', error.response.data)
        toast.error('Erro ao adicionar produto ao pedido.')
      } else {
        console.error('[DEBUG criarPedido] Erro inesperado:', error)
        toast.error('Erro inesperado ao adicionar produto.')
      }
    }
  }

  async function finalizarPedido(pedidoId) {
    try {
      const response = await pedidoService.finalizar(pedidoId)
      console.log('Pedido finalizado com sucesso!', response)
      toast.success('Pedido finalizado com sucesso!')
    } catch (error) {
      console.error('Erro inesperado:', error)
      toast.error('Erro ao finalizar pedido.')
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
