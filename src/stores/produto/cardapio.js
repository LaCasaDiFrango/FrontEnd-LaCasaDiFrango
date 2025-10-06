import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'
import imgFrango from '@/assets/img/chicken-leg.png'
import { useToastStore } from '@/stores/index' // import da store do toast

export const useCardapioStore = defineStore('cardapio', () => {
  const categories = ref([])
  const toast = useToastStore() // instanciando a store de toast
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  const categoriaMap = {
    1: 'Frangos',
    2: 'Maioneses',
    3: 'Costela Assada',
    4: 'Bebidas',
    5: 'Conservas',
    6: 'Farofas',
  }

  const categoriaOrdem = ['Frangos', 'Maioneses', 'Costela Assada','Bebidas', , 'Conservas', 'Farofas']

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
          image: item.imagem
            ? (item.imagem.startsWith('http') ? item.imagem : `${BASE_URL}${item.imagem}`)
            : imgFrango,
        })
      }

      console.log('Agrupados por categoria:', agrupados)

      // Ordena as categorias conforme categoriaOrdem
      categories.value = categoriaOrdem
        .filter(categoriaNome => agrupados[categoriaNome]) // inclui apenas categorias que existem
        .map(categoriaNome => ({
          categoryName: categoriaNome,
          items: agrupados[categoriaNome],
        }))

      console.log('Categorias finais montadas:', categories.value)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      toast.error('Erro ao buscar produtos. Tente novamente.')
    }
  }

  return { categories, fetchProdutos }
})
