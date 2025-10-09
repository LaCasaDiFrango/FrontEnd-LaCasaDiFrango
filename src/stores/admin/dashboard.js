import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user, produto, pedido, categoria } from '@/api/index'

export const useDashboardStore = defineStore('dashboard', () => {
  // === Estados principais ===
  const usuarios = ref(0)
  const produtos = ref(0)
  const pedidos = ref(0)
  const fluxo = ref(0)
  const error = ref(null)

  // === Estados adicionais ===
  const produtosMaisVendidos = ref([])
  const vendasPorCategoria = ref(null) // 🟢 novo gráfico de vendas por categoria

  // === Horários de atualização ===
  const lastUpdatedUsuarios = ref(null)
  const lastUpdatedProdutos = ref(null)
  const lastUpdatedPedidos = ref(null)

  // === Serviços ===
  const userService = new user.default()
  const produtoService = new produto.default()
  const pedidoService = new pedido.default()
  const categoriaService = new categoria.default() // 🟢 novo

  // === Função auxiliar ===
  function getTotalFromPagination(data) {
    if (!data) return 0
    return (data.total_pages - 1) * data.page_size + data.results.length
  }

  // === Função principal ===
  async function fetchDashboardData() {
    error.value = null

    try {
      const [
        usuariosData,
        produtosData,
        pedidosData,
        produtosVendidosData,
        vendasCategoriaData,
      ] = await Promise.all([
        userService.getAll(),
        produtoService.getAll(),
        pedidoService.getAll(),
        produtoService.getMaisVendidos(),
        categoriaService.getVendasPorCategoria(), // 🟢 novo endpoint
      ])

      // === Usuários ===
      const totalUsuarios = getTotalFromPagination(usuariosData)
      if (totalUsuarios !== usuarios.value) {
        usuarios.value = totalUsuarios
        lastUpdatedUsuarios.value = new Date()
      }

      // === Produtos ===
      const totalProdutos = getTotalFromPagination(produtosData)
      if (totalProdutos !== produtos.value) {
        produtos.value = totalProdutos
        lastUpdatedProdutos.value = new Date()
      }

      // === Pedidos ===
      const totalPedidos = pedidosData.filter(p => p.status === 2).length
      if (totalPedidos !== pedidos.value) {
        pedidos.value = totalPedidos
        lastUpdatedPedidos.value = new Date()
      }

      // === Produtos mais vendidos ===
      produtosMaisVendidos.value = produtosVendidosData

      // === Vendas por categoria (para o gráfico) ===
      vendasPorCategoria.value = vendasCategoriaData

      // === Fluxo de caixa (ainda fixo) ===
      fluxo.value = 2700
    } catch (err) {
      console.error('[DashboardStore] Erro ao buscar dados:', err)
      error.value = 'Falha ao carregar os dados do painel.'
    }
  }

  // === Retorno da store ===
  return {
    usuarios,
    produtos,
    pedidos,
    fluxo,
    error,
    produtosMaisVendidos,
    vendasPorCategoria, // 🟢 exportado
    lastUpdatedUsuarios,
    lastUpdatedProdutos,
    lastUpdatedPedidos,
    fetchDashboardData,
  }
})
