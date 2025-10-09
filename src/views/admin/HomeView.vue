<script setup>
import { onMounted } from 'vue'
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

onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>

<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo"
        subtitle="Veja um resumo do que há cadastrado no Sistema"
      />

      <!-- Carrossel -->
      <div class="overflow-x-auto hide-scrollbar">
        <div class="flex gap-6 min-w-max px-2" style="scroll-snap-type: x mandatory">
          <div class="py-2 flex-shrink-0 w-[325px] scroll-snap-align-start">
            <InfoCardAdmin
              title="Usuários"
              :value="`${dashboardStore.usuarios} Clientes`"
              :subtitle="
                dashboardStore.lastUpdatedUsuarios
                  ? `Atualizado às ${new Date(
                      dashboardStore.lastUpdatedUsuarios
                    ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : 'Atualizando...'
              "
              :icon="imageUser"
              color="bg-green-400"
              link="/usuarios"
            />
          </div>

          <div class="py-2 flex-shrink-0 w-[325px] scroll-snap-align-start">
            <InfoCardAdmin
              title="Estoque"
              :value="`${dashboardStore.produtos} Produtos`"
              :subtitle="
                dashboardStore.lastUpdatedPedidos
                  ? `Atualizado às ${new Date(dashboardStore.lastUpdatedPedidos).toLocaleTimeString(
                      [],
                      { hour: '2-digit', minute: '2-digit' }
                    )}`
                  : 'Atualizando...'
              "
              :icon="imageEstoque"
              color="bg-yellow-400"
              link="/estoque"
            />
          </div>

          <div class="py-2 flex-shrink-0 w-[325px] scroll-snap-align-start">
            <InfoCardAdmin
              title="Fluxo de Caixa"
              :value="`R$${dashboardStore.fluxo}`"
              subtitle="Movimentação do dia"
              :icon="imageFluxo"
              color="bg-blue-400"
              link="/fluxo"
            />
          </div>

          <div class="py-2 flex-shrink-0 w-[325px] scroll-snap-align-start">
            <InfoCardAdmin
              title="Pedidos"
              :value="`${dashboardStore.pedidos} Realizados`"
              :subtitle="
                dashboardStore.lastUpdatedPedidos
                  ? `Atualizado às ${new Date(dashboardStore.lastUpdatedPedidos).toLocaleTimeString(
                      [],
                      { hour: '2-digit', minute: '2-digit' }
                    )}`
                  : 'Atualizando...'
              "
              :icon="imagePedido"
              color="bg-orange-400"
              link="/pedidos"
            />
          </div>
          <div class="py-2 flex-shrink-0 scroll-snap-align-start">
            <InfoCardAdmin
              title="Estatísticas"
              value="18 Relatórios"
              subtitle="Veja as estatísticas e relatórios"
              :icon="imageEstatisca"
              color="bg-orange-400"
              link="/estatisticas"
            />
          </div>
        </div>
      </div>
      <div class="flex gap-6 items-end">
        <div class="flex-[0.5]">
          <TopProdutosTableAdmin :produtos="dashboardStore.produtosMaisVendidos" />
        </div>
        <div class="flex-[0.4]">
<TopProdutosChart :chartData="dashboardStore.vendasPorCategoria" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Esconde a barra de rolagem, mas mantém o scroll funcional */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
