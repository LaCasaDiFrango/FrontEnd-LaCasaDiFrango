<script setup>
import { onMounted, computed } from 'vue'
import { useDashboardStore } from '@/stores'

import {
  NavLateralAdmin,
  InfoCardAdmin,
  TitleAdmin,
  TopProdutosTableAdmin,
  TopProdutosChart,
} from '@/components/index'

import imageFluxo from '@/assets/img/admin/money-cash-svgrepo-com.svg'
import imagePedido from '@/assets/img/admin/order-svgrepo-com.svg'
import imageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import imageEstoque from '@/assets/img/admin/inventorymajor-svgrepo-com.svg'
import imageEstatisca from '@/assets/img/admin/statistics-svgrepo-com.svg'

const dashboardStore = useDashboardStore()
const isLoading = computed(() => dashboardStore.error === null && dashboardStore.lastUpdatedUsuarios === null)

onMounted(() => {
  dashboardStore.fetchDashboardData()
})

// Helpers de formatação
const formatNumber = n => n?.toLocaleString('pt-BR')
const formatCurrency = v => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
</script>

<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo"
        subtitle="Veja um resumo do que há cadastrado no Sistema"
      />

      <div v-if="isLoading" class="flex justify-center items-center h-64 text-gray-500">
        <span>Carregando dados do painel...</span>
      </div>

      <template v-else>
        <!-- Carrossel -->
        <div class="overflow-x-auto hide-scrollbar">
          <div class="flex gap-6 min-w-max px-2" style="scroll-snap-type: x mandatory">
            <div
              v-for="card in [
                {
                  title: 'Usuários',
                  value: `${formatNumber(dashboardStore.usuarios)} Clientes`,
                  subtitle: dashboardStore.lastUpdatedUsuarios,
                  icon: imageUser,
                  color: 'bg-green-400',
                  link: '/usuarios',
                },
                {
                  title: 'Estoque',
                  value: `${formatNumber(dashboardStore.produtos)} Produtos`,
                  subtitle: dashboardStore.lastUpdatedProdutos,
                  icon: imageEstoque,
                  color: 'bg-yellow-400',
                  link: '/estoque',
                },
                {
                  title: 'Fluxo de Caixa',
                  value: formatCurrency(dashboardStore.fluxo),
                  subtitle: 'Movimentação do dia',
                  icon: imageFluxo,
                  color: 'bg-blue-400',
                  link: '/fluxo',
                },
                {
                  title: 'Pedidos',
                  value: `${formatNumber(dashboardStore.pedidos)} Realizados`,
                  subtitle: dashboardStore.lastUpdatedPedidos,
                  icon: imagePedido,
                  color: 'bg-orange-400',
                  link: '/pedidos',
                },
                {
                  title: 'Estatísticas',
                  value: '18 Relatórios',
                  subtitle: 'Veja as estatísticas e relatórios',
                  icon: imageEstatisca,
                  color: 'bg-orange-400',
                  link: '/estatisticas',
                },
              ]"
              :key="card.title"
              class="py-2 flex-shrink-0 w-[325px] scroll-snap-align-start"
            >
              <InfoCardAdmin
                :title="card.title"
                :value="card.value"
                :subtitle="card.subtitle
                  ? `Atualizado às ${new Date(card.subtitle).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : 'Atualizando...'"
                :icon="card.icon"
                :color="card.color"
                :link="card.link"
              />
            </div>
          </div>
        </div>

        <!-- Tabelas e gráficos -->
        <div class="flex gap-6 items-end">
          <div class="flex-[0.5]">
            <TopProdutosTableAdmin :produtos="dashboardStore.produtosMaisVendidos" />
          </div>
          <div class="flex-[0.4]">
            <TopProdutosChart :chartData="dashboardStore.vendasPorCategoria" />
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
