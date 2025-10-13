import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'

export const useProdutosStore = defineStore('produtos', () => {
  const produtoService = new produto.default()
  const produtos = ref([])

  async function fetchProdutos() {
    try {
      const data = await produtoService.getAll()
      produtos.value = data.results || data // dependendo do backend
    } catch (err) {
      console.error('[ProdutosStore] Erro:', err)
    }
  }

  return { produtos, fetchProdutos }
})
