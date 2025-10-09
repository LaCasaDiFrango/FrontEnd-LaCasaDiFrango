import { defineStore } from 'pinia'
import { ref } from 'vue'
import { user, produto, pedido } from '@/api/index'

export const useDashboardStore = defineStore('dashboard', () => {
  // estados
  const usuarios = ref(0)
  const produtos = ref(0)
  const pedidos = ref(0)
  const fluxo = ref(0)
  const error = ref(null)

  const produtosMaisVendidos = ref([]) // novo estado

  // novos estados para armazenar o horário de atualização individual
  const lastUpdatedUsuarios = ref(null)
  const lastUpdatedProdutos = ref(null)
  const lastUpdatedPedidos = ref(null)

  // instanciar os serviços
  const userService = new user.default()
  const produtoService = new produto.default()
  const pedidoService = new pedido.default()

  function getTotalFromPagination(data) {
    if (!data) return 0
    return (data.total_pages - 1) * data.page_size + data.results.length
  }

  // função principal para atualizar os dados
  async function fetchDashboardData() {
    error.value = null

    try {
      const [usuariosData, produtosData, pedidosData, produtosVendidosData] = await Promise.all([
        userService.getAll(),
        produtoService.getAll(),
        pedidoService.getAll(),
        produtoService.getMaisVendidos(), // novo
      ])

      // atualizar usuários
      const totalUsuarios = getTotalFromPagination(usuariosData)
      if (totalUsuarios !== usuarios.value) {
        usuarios.value = totalUsuarios
        lastUpdatedUsuarios.value = new Date()
      }

      // atualizar produtos
      const totalProdutos = getTotalFromPagination(produtosData)
      if (totalProdutos !== produtos.value) {
        produtos.value = totalProdutos
        lastUpdatedProdutos.value = new Date()
      }

      // atualizar pedidos realizados
      const totalPedidos = pedidosData.filter(p => p.status === 2).length
      if (totalPedidos !== pedidos.value) {
        pedidos.value = totalPedidos
        lastUpdatedPedidos.value = new Date()
      }

      // atualizar produtos mais vendidos
      produtosMaisVendidos.value = produtosVendidosData

      fluxo.value = 2700 // ainda está estático

    } catch (err) {
      console.error('[DashboardStore] Erro ao buscar dados:', err)
      error.value = 'Falha ao carregar os dados do painel.'
    }
  }

  return {
    // estados
    usuarios,
    produtos,
    pedidos,
    fluxo,
    error,
    produtosMaisVendidos,
    lastUpdatedUsuarios,
    lastUpdatedProdutos,
    lastUpdatedPedidos,
    // ações
    fetchDashboardData,
  }
})
