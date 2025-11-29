import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user, produto, pedido, categoria } from '@/api/index'

export const useDashboardStore = defineStore('dashboard', () => {
  // === Estados principais ===
  const totalVendas = ref(0)
  const usuarios = ref(0)
  const produtos = ref(0)
  const pedidos = ref(0)
  const fluxo = ref(0)
  
  const error = ref(null)

  // === Estados adicionais ===
  const produtosMaisVendidos = ref([])
  const vendasPorCategoria = ref(null)

  // === Horários de atualização ===
  const lastUpdatedUsuarios = ref(null)
  const lastUpdatedProdutos = ref(null)
  const lastUpdatedPedidos = ref(null)

  // === Serviços ===
  const userService = new user.default()
  const produtoService = new produto.default()
  const pedidoService = new pedido.default()
  const categoriaService = new categoria.default()

  // === Função para buscar todos os itens paginados ===
async function fetchAllPaginated(serviceMethod) {
  const allResults = []
  try {
    let page = 1
    let totalPages = 1

    do {
      const raw = await serviceMethod({ page, page_size: 100 })
      const data = raw && raw.data !== undefined ? raw.data : raw // <-- adicionada a linha crucial

      if (!data || !Array.isArray(data.results)) break

      allResults.push(...data.results)
      totalPages = data.total_pages || 1
      page++
    } while (page <= totalPages)

    return allResults
  } catch (err) {
    console.error('[DashboardStore] fetchAllPaginated erro:', err)
    throw err
  }
}


async function fetchDashboardData() {
  error.value = null

  try {
    const [
      usuariosData,
      produtosData,
      pedidosData,
      produtosVendidosData,
      vendasCategoriaData,
      totalVendasApi
    ] = await Promise.all([
      fetchAllPaginated(userService.getAll),
      fetchAllPaginated(produtoService.getAll),
      fetchAllPaginated(pedidoService.getAll),
      produtoService.getMaisVendidos(),
      categoriaService.getVendasPorCategoria(),
      pedidoService.totalVendas()
    ])

    usuarios.value = usuariosData.length
    produtos.value = produtosData.length
    pedidos.value = pedidosData.filter(p => p.status === 2).length

    lastUpdatedUsuarios.value = new Date()
    lastUpdatedProdutos.value = new Date()
    lastUpdatedPedidos.value = new Date()

    produtosMaisVendidos.value = produtosVendidosData
    vendasPorCategoria.value = vendasCategoriaData

    // 🟢 Aqui está o fluxo de caixa real
    fluxo.value = totalVendasApi ?? 0

  } catch (err) {
    console.error('[DashboardStore] Erro ao buscar dados:', err)
    error.value = 'Falha ao carregar os dados do painel.'
  }
}


  return {
    usuarios,
    produtos,
    pedidos,
    fluxo,
    error,
    produtosMaisVendidos,
    vendasPorCategoria,
    lastUpdatedUsuarios,
    lastUpdatedProdutos,
    lastUpdatedPedidos,
    fetchDashboardData,
    fetchAllPaginated,
  }
})
