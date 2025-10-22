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
    const pedidoStore = usePedidoStore()
    const toast = useToastStore()

    await pedidoStore.carregarPedidoAtual()
    let carrinho = pedidoStore.pedidoAtual

    const novoItem = {
      produto: produtoSelecionado.value.id,
      quantidade: quantidade.value,
    }

if (carrinho && carrinho.status === 1) {
  // Mapear itens existentes para apenas { produto: id, quantidade }
const itensFormatados = (carrinho.itens || []).map(i => ({
  produto: i.produto.id,
  quantidade: i.quantidade
}))

// Verifica se o produto já existe
const indexExistente = itensFormatados.findIndex(i => i.produto === produtoSelecionado.value.id)
if (indexExistente >= 0) {
  itensFormatados[indexExistente].quantidade += quantidade.value
} else {
  itensFormatados.push({
    produto: produtoSelecionado.value.id,
    quantidade: quantidade.value
  })
}

  const payload = { itens: itensFormatados, status: 1 }

  const response = await pedidoService.update(carrinho.id, payload)
  pedidoStore.pedidoAtual = response
  toast.success(`${produtoSelecionado.value.nome} adicionado ao pedido existente!`)
  router.push("/home/pedidos/")
    } else {
      // Cria novo pedido se não houver um aberto
      const dadosParaEnviar = { itens: [novoItem], status: 1 }
      const response = await pedidoService.create(dadosParaEnviar)
      pedidoStore.pedidoAtual = response
      toast.success(`${produtoSelecionado.value.nome} adicionado a um novo pedido!`)
    }
  } catch (error) {
    console.error('[criarPedido] Erro:', error)
    toast.error('Erro ao adicionar produto ao pedido.')
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