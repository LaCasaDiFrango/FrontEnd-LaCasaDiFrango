<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin title="Painel Administrativo" subtitle="Resumo de cadastros e movimentações" />

      <div v-if="isLoading" class="flex justify-center items-center h-64 text-gray-500">
        <span>Carregando dados do painel...</span>
      </div>

      <template v-else>
        <!-- Carrossel de Cards -->
        <div class="overflow-x-auto hide-scrollbar">
          <div class="flex gap-6 min-w-max px-2" style="scroll-snap-type: x mandatory">
            <div
              v-for="card in cards"
              :key="card.title"
              class="py-2 flex-shrink-0 w-[325px] scroll-snap-align-start cursor-pointer"
              @click="selectCategory(card.title)"
            >
              <InfoCardAdmin
                :title="card.title"
                :value="card.value"
                :subtitle="
                  card.subtitle
                    ? `Atualizado às ${new Date(card.subtitle).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'Atualizando...'
                "
                :icon="card.icon"
                :color="card.color"
              />
            </div>
          </div>
        </div>

        <!-- Área dinâmica abaixo dos cards -->
        <transition name="fade">
          <div v-if="selectedCategory" class="mt-8 text-center">
            <h1 class="text-4xl text-gray-800 font-bold">
              {{ selectedCategory }}
            </h1>
            <p class="text-gray-500 mt-2">
              Aqui aparecerão os gráficos e tabelas relacionados a
              {{ selectedCategory.toLowerCase() }}.
            </p>
          </div>
        </transition>
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

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDashboardStore } from '@/stores'
import { NavLateralAdmin, InfoCardAdmin, TitleAdmin, TopProdutosTableAdmin, TopProdutosChart } from '@/components/index'

import imageFluxo from '@/assets/img/admin/money-cash-svgrepo-com.svg'
import imagePedido from '@/assets/img/admin/order-svgrepo-com.svg'
import imageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import imageEstoque from '@/assets/img/admin/inventorymajor-svgrepo-com.svg'
import imageEstatisca from '@/assets/img/admin/statistics-svgrepo-com.svg'

const dashboardStore = useDashboardStore()
const selectedCategory = ref(null)

function selectCategory(category) {
  selectedCategory.value = category
}

const isLoading = computed(
  () => dashboardStore.error === null && dashboardStore.lastUpdatedUsuarios === null,
)

onMounted(() => {
  dashboardStore.fetchDashboardData()
})

const formatNumber = (n) => n?.toLocaleString('pt-BR')
const formatCurrency = (v) => v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const cards = computed(() => [
  {
    title: 'Usuários',
    value: `${formatNumber(dashboardStore.usuarios)} Clientes`,
    subtitle: dashboardStore.lastUpdatedUsuarios,
    icon: imageUser,
    color: 'bg-green-400',
  },
  {
    title: 'Estoque',
    value: `${formatNumber(dashboardStore.produtos)} Produtos`,
    subtitle: dashboardStore.lastUpdatedProdutos,
    icon: imageEstoque,
    color: 'bg-yellow-400',
  },
  {
    title: 'Fluxo de Caixa',
    value: formatCurrency(dashboardStore.fluxo),
    subtitle: 'Movimentação do dia',
    icon: imageFluxo,
    color: 'bg-blue-400',
  },
  {
    title: 'Pedidos',
    value: `${formatNumber(dashboardStore.pedidos)} Realizados`,
    subtitle: dashboardStore.lastUpdatedPedidos,
    icon: imagePedido,
    color: 'bg-orange-400',
  },
  {
    title: 'Estatísticas',
    value: '18 Relatórios',
    subtitle: 'Veja as estatísticas e relatórios',
    icon: imageEstatisca,
    color: 'bg-orange-400',
  },
])
</script>

<style scoped>
.hide-scrollbar {
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #a3a3a3 #f1f1f1;
}

/* Chrome, Edge e Safari */
.hide-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.hide-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: #a3a3a3;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.hide-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #6b6b6b;
}
</style>
