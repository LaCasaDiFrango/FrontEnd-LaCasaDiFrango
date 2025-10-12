import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useDashboardTitleStore = defineStore('dashboardTitle', () => {
  const route = useRoute()

  // Mapa de subtítulos por nome da rota
  const subtitleMap = {
    'Painel Administrativo': 'Veja um resumo do que há cadastrado no Sistema',
    'Estoque': 'Gerencie todos os produtos disponíveis no sistema',
    'Usuários': 'Visualize e administre os usuários cadastrados',
    'Pedidos': 'Acompanhe os pedidos realizados no sistema',
    'Fluxo do Caixa': 'Confira o fluxo de caixa do sistema',
    'Estatísticas': 'Visualize estatísticas e relatórios do sistema'
  }

  // Título dinâmico usando o name da rota
  const title = computed(() => {
    const base = 'Painel'
    // Se for a rota raiz do dashboard, mostra só 'Painel'
    if (!route.name || route.name === 'Painel Administrativo') return base
    return `${base} > ${route.name}`
  })

  // Subtítulo baseado no name da rota
  const subtitle = computed(() => {
    if (!route.name) return subtitleMap['Painel Administrativo']
    return subtitleMap[route.name] || ''
  })

  return { title, subtitle }
})
