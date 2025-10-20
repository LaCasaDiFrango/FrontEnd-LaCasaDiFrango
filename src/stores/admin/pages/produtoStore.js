import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'

export const useProdutosStore = defineStore('produtos', () => {
  const produtoService = new produto.default()
  const produtos = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const itemsPerPage = ref(10)

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

  // 🔹 Buscar produtos (apenas uma página por vez)
  async function ProdutosPage(page = 1) {
    try {
      const data = await produtoService.getAll({ page, limit: itemsPerPage.value })
      produtos.value = data.results || []
      currentPage.value = data.page || 1
      totalPages.value = data.total_pages || 1
    } catch (err) {
      console.error('[ProdutosStore] Erro ao buscar produtos:', err)
    }
  }

  // 🔹 Mudar página
  function setCurrentPage(page) {
    currentPage.value = page
    ProdutosPage(page)
  }

  // 🔹 Cadastrar novo produto
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

  // 🔹 Atualizar preço
  async function atualizarPreco(id, precoParaEnviar) {
    try {
      const precoString = String(precoParaEnviar).replace(',', '.')
      const valorNumerico = parseFloat(precoString)

      if (isNaN(valorNumerico)) {
        throw new Error('Formato de preço inválido.')
      }

      await produtoService.alterarPreco(id, valorNumerico)

      const index = produtos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        const produtoAtualizado = { ...produtos.value[index] }
        produtoAtualizado.preco = valorNumerico.toFixed(2)
        produtos.value[index] = produtoAtualizado

        console.log(`[STORE] Produto ${id} atualizado. Novo preço: ${produtoAtualizado.preco}`)
      }
    } catch (err) {
      console.error('[ProdutosStore] Erro ao alterar preço:', err)
      throw err
    }
  }

  // 🔹 Ajustar quantidade em estoque
  async function ajustarQuantidade(id, quantidadeParaEnviar) {
    try {
      const quantidadeNumerica = parseInt(quantidadeParaEnviar, 10)
      if (isNaN(quantidadeNumerica)) {
        throw new Error('Formato de quantidade inválido.')
      }

      const data = await produtoService.ajustarEstoque(id, quantidadeNumerica)
      const index = produtos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        produtos.value[index].quantidade_em_estoque = data.novo_estoque
      }
    } catch (err) {
      console.error('[ProdutosStore] Erro ao ajustar quantidade:', err)
      throw err
    }
  }

  // 🔹 Deletar produto
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
    ajustarQuantidade,
    deletarProduto,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    ProdutosPage,
  }
})
