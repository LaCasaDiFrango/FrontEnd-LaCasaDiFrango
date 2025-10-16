// stores/produtos.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'

export const useProdutosStore = defineStore('produtos', () => {
  const produtoService = new produto.default()
  const produtos = ref([])

  async function fetchProdutos() {
    try {
      const data = await produtoService.getAll()
      produtos.value = data.results || data
    } catch (err) {
      console.error('[ProdutosStore] Erro:', err)
    }
  }

  async function cadastrarProduto(produtoData) {
    try {
      const response = await produtoService.create(produtoData)
      produtos.value.push(response) // opcional: atualiza a lista
      return response
    } catch (err) {
      console.error('[ProdutosStore] Erro ao cadastrar produto:', err)
      throw err
    }
  }

  return { produtos, fetchProdutos, cadastrarProduto }
})
