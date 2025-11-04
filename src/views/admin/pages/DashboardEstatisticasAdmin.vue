<template>
  <div class="flex min-h-screen bg-gray-50">
    <NavLateralAdmin />

    <main class="flex-1 p-8 space-y-8 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Estatísticas"
        subtitle="Resumo de cadastros e movimentações"
      />

      <!-- Loader -->
      <div
        v-if="isLoading"
        class="flex justify-center items-center h-64 text-gray-500"
      >
        <span>Carregando dados do painel...</span>
      </div>

      <template v-else>
        <!-- Carrossel de Cards -->
        <div class="overflow-x-auto hide-scrollbar">
          <div class="flex gap-6 w-full px-2" style="scroll-snap-type: x mandatory">
            <div
              v-for="card in cards"
              :key="card.title"
              class="py-2 flex-shrink-0 flex-1 scroll-snap-align-start cursor-pointer"
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

        <!-- Conteúdo dinâmico -->
        <transition name="fade">
          <!-- Mensagem inicial -->
          <div
            v-if="!selectedCategory"
            class="mt-20 text-center text-gray-500 text-xl flex flex-col items-center justify-center h-64 animate-fadeIn"
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
            <p class="text-2xl font-medium">Selecione uma categoria</p>
            <p class="text-gray-400 mt-2">
              para visualizar as estatísticas e gráficos correspondentes.
            </p>
          </div>

          <!-- Categoria selecionada -->
          <div v-else class="mt-10 space-y-10 animate-fadeIn">
            <!-- Cabeçalho da categoria -->
            <div class="border-b border-gray-300 pb-4 flex justify-between items-center">
              <h1 class="text-4xl font-bold text-gray-800 tracking-tight">
                {{ selectedCategory }}
              </h1>
              <span class="text-gray-400 italic text-sm">Visão analítica em tempo real</span>
            </div>

            <!-- Seção dinâmica -->
            <div class="flex justify-between items-center w-full">
              <!-- Usuários -->
           <!-- Usuários -->
<template v-if="selectedCategory === 'Usuários'">
  <div class="col-span-2 space-y-6">
    <div class="flex justify-end gap-3 mb-4">
      <button
        class="px-4 py-2 rounded-lg transition"
        :class="selectedUserChart === 'status' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        @click="selectedUserChart = 'status'"
      >
        Status dos Usuários
      </button>
      <button
        class="px-4 py-2 rounded-lg transition"
        :class="selectedUserChart === 'ativos' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        @click="selectedUserChart = 'ativos'"
      >
        Usuários Mais Ativos
      </button>
    </div>

    <div class="flex items-start justify-between gap-8 w-full">
      <!-- Texto com sombra -->
      <div class="flex flex-col flex-[0_0_35%] text-left ">
                          <div class="flex flex-col justify-start items-start bg-green-50 rounded-xl p-6 shadow-lg border border-green-200">
    <h2 class="text-xl font-semibold text-green-700">Engajamento de Usuários</h2>
  <p class="text-gray-700 leading-relaxed">
    Analise como seus usuários estão se comportando dentro da plataforma.
    Observe quem mais interage e quais grupos estão menos ativos,
    ajudando a direcionar ações de retenção e fidelização.
  </p>
  </div>
  <!-- Botão de relatório -->
  <div class="mt-4">
    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
      Emitir Relatório
    </button>
  </div>
  <div class="mt-4">
  <PodioTop3 />
  </div>
</div>

      <!-- Gráfico com sombra -->
      <div class="flex-[0_0_60%] bg-white rounded-2xl shadow-lg p-4">
        <UserStatusChart v-if="selectedUserChart === 'status'" />
        <TopActiveUsersChart v-else />
      </div>
    </div>
  </div>
</template>

<!-- Pedidos -->
<template v-else-if="selectedCategory === 'Pedidos'">
  <div class="col-span-2 space-y-6">
    <!-- Botão único para manter layout -->
    <div class="flex justify-end gap-3 mb-4">
      <button
        class="px-4 py-2 rounded-lg transition bg-blue-500 text-white shadow"
      >
        Volume de Pedidos
      </button>
    </div>

    <div class="flex items-start justify-between gap-8 w-full">
    <div class="flex flex-col flex-[0_0_35%] text-left">
                    <div class="flex flex-col justify-start items-start bg-orange-50 rounded-xl p-6 shadow-lg border border-orange-200">
  <h2 class="text-xl font-semibold text-orange-700 mb-2">Volume de Pedidos</h2>
  <p class="text-gray-700 leading-relaxed">
    Este gráfico mostra o comportamento dos pedidos ao longo do tempo,
    destacando períodos de alta demanda e sazonalidade das vendas.
  </p>
</div>
  <!-- Botão de relatório abaixo da div de texto -->
  <div class="mt-4">
    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
      Emitir Relatório  
    </button>
  </div>
</div>

      <div class="flex-[0_0_60%] bg-white rounded-2xl shadow-lg p-4">
        <PedidosPorPeriodoChart />
      </div>
    </div>
  </div>
</template>

<!-- Estoque -->
<template v-else-if="selectedCategory === 'Estoque'">
  <div class="col-span-2 space-y-6">
    <!-- Botão único para manter layout -->
    <div class="flex justify-end gap-3 mb-4">
      <button
        class="px-4 py-2 rounded-lg transition bg-blue-500 text-white shadow"
      >
        Controle de Estoque
      </button>
    </div>

    <div class="flex items-start justify-between gap-8 w-full">
      <div class="flex flex-col flex-[0_0_35%] text-left">
              <div class="flex flex-col justify-start items-start bg-yellow-50 rounded-xl p-6 shadow-lg border border-yellow-200">
        <h2 class="text-xl font-semibold text-yellow-700 mb-2">Controle de Estoque</h2>
        <p class="text-gray-700 leading-relaxed">
          Acompanhe os níveis de estoque e previsões de reposição.
          Gráficos ajudam a identificar produtos críticos e otimizar o fluxo logístico.
        </p>
        </div>
          <div class="mt-4">
    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
      Emitir Relatório  
    </button>
  </div>
      </div>
      <div class="flex-[0_0_60%] bg-white rounded-2xl shadow-lg p-4">
        <EstoquePrevisaoChart />
      </div>
    </div>
  </div>
</template>

<!-- Fluxo de Caixa -->
<template v-else-if="selectedCategory === 'Fluxo de Caixa'">
  <div class="col-span-2 space-y-6">
    <div class="flex justify-end gap-3 mb-4">
      <button
        class="px-4 py-2 rounded-lg transition"
        :class="selectedFluxoChart === 'fluxo' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        @click="selectedFluxoChart = 'fluxo'"
      >
        Resumo do Caixa
      </button>
      <button
        class="px-4 py-2 rounded-lg transition"
        :class="selectedFluxoChart === 'metodo' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        @click="selectedFluxoChart = 'metodo'"
      >
        Métodos de Pagamento
      </button>
    </div>

    <div class="flex items-start justify-between gap-8 w-full">
      <div class="flex flex-col flex-[0_0_35%] text-left">
        <div class="flex flex-col justify-start items-start bg-blue-50 rounded-xl p-6 shadow-lg border border-blue-200">
        <h2 class="text-xl font-semibold text-blue-700 mb-2">Análise Financeira</h2>
        <p class="text-gray-700 leading-relaxed">
          Monitore a saúde financeira da empresa em tempo real.
          Compare movimentações diárias e entenda o comportamento
          dos pagamentos recebidos.
        </p>
        </div>
          <div class="mt-4">
    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
      Emitir Relatório  
    </button>
  </div>
      </div>
      <div class="flex-[0_0_60%] bg-white rounded-2xl shadow-lg p-4">
        <FluxoCaixaChart v-if="selectedFluxoChart === 'fluxo'" />
        <MetodoPagamentoChart v-else />
      </div>
    </div>
  </div>
</template>

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
  PodioTop3,
} from '@/components/index'

import TopActiveUsersChart from '@/components/admin/tables/TopActiveUsersChart.vue'

import imageFluxo from '@/assets/img/admin/money-cash-svgrepo-com.svg'
import imagePedido from '@/assets/img/admin/order-svgrepo-com.svg'
import imageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import imageEstoque from '@/assets/img/admin/inventorymajor-svgrepo-com.svg'

const dashboardStore = useDashboardStore()
const selectedCategory = ref(null)
const selectedUserChart = ref('status')
const selectedFluxoChart = ref('fluxo')

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
}
.hide-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #6b6b6b;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animações sutis */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce-slow {
  animation: bounce-slow 1.5s infinite;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
