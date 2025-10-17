import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'

export const useProdutosStore = defineStore('produtos', () => {
  const produtoService = new produto.default()
  const produtos = ref([])

  // Buscar todos os produtos
async function fetchProdutos() {
  try {
    const todosProdutos = []
    let page = 1
    let totalPages = 1

    do {
      const data = await produtoService.getAll({ page })
      if (data.results?.length) {
        todosProdutos.push(...data.results)
      }
      totalPages = data.total_pages || 1
      page++
    } while (page <= totalPages)

    produtos.value = todosProdutos
  } catch (err) {
    console.error('[ProdutosStore] Erro:', err)
  }
}


  // Cadastrar novo produto
  async function cadastrarProduto(produtoData) {
    try {
      const response = await produtoService.create(produtoData)
      produtos.value.push(response)
      return response
    } catch (err) {
      console.error('[ProdutosStore] Erro ao cadastrar produto:', err)
      throw err
    }
  }

  // Atualizar preço de um produto
  async function atualizarPreco(id, novoPreco) {
    try {
      const valor = parseFloat(novoPreco) // garante número
      const response = await produtoService.alterarPreco(id, valor)
      // Atualiza store local
      const index = produtos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        produtos.value[index].preco = valor
      }
      return response
    } catch (err) {
      console.error('[ProdutosStore] Erro ao alterar preço:', err)
      throw err
    }
  }

  // Deletar produto
  async function deletarProduto(id) {
    try {
      const ok = await produtoService.delete(id)
      if (ok) {
        produtos.value = produtos.value.filter(p => p.id !== id)
      }
      return ok
    } catch (err) {
      console.error('[ProdutosStore] Erro ao deletar produto:', err)
      throw err
    }
  }

  return {
    produtos,
    fetchProdutos,
    cadastrarProduto,
    atualizarPreco,
    deletarProduto,
  }
})
