import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'
import imgFrango from '@/assets/img/chicken-leg.png'

export const useCardapioStore = defineStore('cardapio', () => {
  const categories = ref([])

  const categoriaMap = {
    1: 'Bebidas',
    2: 'Maionese',
    3: 'Frango',
  }

  async function fetchProdutos() {
    try {
      const produtoService = new produto.default()
      const response = await produtoService.getAll()
      const produtos = response.results

      const agrupados = {}

      for (const item of produtos) {
        const categoriaNome = categoriaMap[item.categoria]
        if (!categoriaNome) continue

        if (!agrupados[categoriaNome]) {
          agrupados[categoriaNome] = []
        }

        agrupados[categoriaNome].push({
          nome: item.nome,
          preco: parseFloat(item.preco).toFixed(2).replace('.', ','),
          categoria: item.categoria,
          image: imgFrango,
        })
      }

      categories.value = Object.entries(agrupados).map(([categoryName, items]) => ({
        categoryName,
        items,
      }))
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  return { categories, fetchProdutos }
})
