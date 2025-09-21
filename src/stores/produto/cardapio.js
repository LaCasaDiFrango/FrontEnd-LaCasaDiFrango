import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'
import imgFrango from '@/assets/img/chicken-leg.png'
import { useToastStore } from '@/stores/index' // import da store do toast

export const useCardapioStore = defineStore('cardapio', () => {
  const categories = ref([])
  const toast = useToastStore() // instanciando a store de toast

  const categoriaMap = {
    1: 'Bebidas',
    2: 'Maioneses',
    3: 'Frangos',
    4: 'Conservas',
    5: 'Farofas',
    6: 'Costela Assada',
  }

  async function fetchProdutos() {
    try {
      const produtoService = new produto.default()
      const todosProdutos = []
      let page = 1
      let totalPages = 1

      do {
        const response = await produtoService.getAll({ page })

        console.log(`Página ${page} carregada`, response)

        if (response.results?.length) {
          todosProdutos.push(...response.results)
        }

        totalPages = response.total_pages || 1
        page++
      } while (page <= totalPages)

      if (!todosProdutos.length) {
        toast.info('Nenhum produto encontrado.')
      }

      console.log('Todos os produtos carregados:', todosProdutos)

      const agrupados = {}

      for (const item of todosProdutos) {
        const categoriaNome = categoriaMap[parseInt(item.categoria)]

        if (!categoriaNome) {
          console.warn('Produto ignorado (categoria inválida):', item)
          continue
        }

        if (!agrupados[categoriaNome]) {
          agrupados[categoriaNome] = []
        }

        agrupados[categoriaNome].push({
          id: item.id,
          nome: item.nome,
          preco: parseFloat(item.preco).toFixed(2).replace('.', ','),
          categoria: item.categoria,
          image: imgFrango,
        })
      }

      console.log('Agrupados por categoria:', agrupados)

      categories.value = Object.entries(agrupados).map(([categoryName, items]) => ({
        categoryName,
        items,
      }))

      console.log('Categorias finais montadas:', categories.value)
      toast.success('Produtos carregados com sucesso!')
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      toast.error('Erro ao buscar produtos. Tente novamente.')
    }
  }

  return { categories, fetchProdutos }
})
