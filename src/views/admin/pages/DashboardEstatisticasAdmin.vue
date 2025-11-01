<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Estatísticas"
        subtitle="Resumo de cadastros e movimentações"
      />

      <div
        v-if="isLoading"
        class="flex justify-center items-center h-64 text-gray-500"
      >
        <span>Carregando dados do painel...</span>
      </div>

      <template v-else>
        <!-- Carrossel de Cards -->
        <div class="overflow-x-auto hide-scrollbar">
          <div
            class="flex gap-6 min-w-max px-2"
            style="scroll-snap-type: x mandatory"
          >
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
          <!-- Mensagem inicial -->
          <div
            v-if="!selectedCategory"
            class="mt-16 text-center text-gray-500 text-xl flex flex-col items-center justify-center h-64 animate-fadeIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-gray-400 mb-4 animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12l-7.5 7.5M3 12h18"
              />
            </svg>
            <p class="text-2xl font-medium">Clique em uma categoria</p>
            <p class="text-gray-400 mt-2">
              para visualizar as estatísticas e gráficos correspondentes.
            </p>
          </div>

          <!-- Conteúdo dinâmico -->
          <div v-else class="mt-8 text-center space-y-8">
            <h1 class="text-4xl text-gray-800 font-bold">
              {{ selectedCategory }}
            </h1>

            <div v-if="selectedCategory === 'Usuários'" class="space-y-8 flex">
               <UserStatusChart />
              <TopActiveUsersChart />
             
            </div>

            <div v-else-if="selectedCategory === 'Pedidos'" class="space-y-8">
              <PedidosPorPeriodoChart />
            </div>

            <div v-else-if="selectedCategory === 'Estoque'" class="space-y-8">
              <EstoquePrevisaoChart />
            </div>

            <div
              v-else-if="selectedCategory === 'Fluxo de Caixa'"
              class="space-y-8 flex"
            >
              <FluxoCaixaChart />
              <MetodoPagamentoChart />
            </div>
          </div>
        </transition>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDashboardStore } from '@/stores'

import {
  NavLateralAdmin,
  InfoCardAdmin,
  TitleAdmin,
  EstoquePrevisaoChart,
  FluxoCaixaChart,
  MetodoPagamentoChart,
  PedidosPorPeriodoChart,
  UserStatusChart,
} from '@/components/index'

import imageFluxo from '@/assets/img/admin/money-cash-svgrepo-com.svg'
import imagePedido from '@/assets/img/admin/order-svgrepo-com.svg'
import imageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import imageEstoque from '@/assets/img/admin/inventorymajor-svgrepo-com.svg'
import TopActiveUsersChart from '@/components/admin/tables/TopActiveUsersChart.vue'


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
const formatCurrency = (v) =>
  v?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

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

/* Animações */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 1.5s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-in-out;
}
</style>
