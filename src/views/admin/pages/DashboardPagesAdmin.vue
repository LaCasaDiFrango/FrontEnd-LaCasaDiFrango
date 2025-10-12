<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        :title="dashboardTitleStore.title"
        :subtitle="dashboardTitleStore.subtitle"
      />
    <div class="flex w-full justify-center items-center">
    <div class="flex flex-[0.9] gap-6 justify-between items-center">
      <ButtonActionAdmin
        :acao="actions.addLabel"
        :showDropdown="!!actions.dropdown"
        :options="actions.dropdown"
        @click="actions.add"
      />
      <InfoCardAdmin
        title="Em construção"
        :value="`Esta página está em construção.`"
        :subtitle="`Por favor, volte mais tarde.`"
      />
    </div>
    </div>
    <div class="flex w-full justify-center items-center">
        <div class="flex-[0.9]">
          <TablePagesAdmin
            :title="dashboardTitleStore.tableTitle"
            :items="mockData"
            label="Preço"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { NavLateralAdmin, TitleAdmin, ButtonActionAdmin, InfoCardAdmin, TablePagesAdmin } from '@/components/index'
import { useDashboardTitleStore, useDashboardStore } from '@/stores/index'

const dashboardTitleStore = useDashboardTitleStore()
const dashboardStore = useDashboardStore()

onMounted(() => {
  dashboardStore.fetchDashboardData()
})

const props = defineProps({
  pageTitle: String,
  dataKey: String,
  columns: Array,
  actions: {
    type: Object,
    default: () => ({ add: null, addLabel: null, dropdown: [] })
  }
})

const mockData = [
  { id: 28, nome: 'Camiseta Oversized', preco: 'R$ 149,90'},
  { id: 52, nome: 'Tênis Street', preco: 'R$ 399,90'},
  { id: 3, nome: 'Jaqueta Jeans', preco: 'R$ 249,90'},
  { id: 54, nome: 'Calça Cargo', preco: 'R$ 199,90'},
  { id: 55, nome: 'Mochila Urbana', preco: 'R$ 179,90'},
  { id: 56, nome: 'Relógio Digital', preco: 'R$ 299,90'},
  { id: 67, nome: 'Óculos de Sol', preco: 'R$ 129,90'},
  { id: 40, nome: 'Tênis Casual', preco: 'R$ 349,90'},
  { id: 9, nome: 'Camisa Polo', preco: 'R$ 159,90'},
  { id: 10, nome: 'Bermuda Jeans', preco: 'R$ 189,90'},
  { id: 11, nome: 'Jaqueta de Couro', preco: 'R$ 499,90'},
  { id: 12, nome: 'Tênis Esportivo', preco: 'R$ 299,90'},
  { id: 13, nome: 'Calça Jeans', preco: 'R$ 219,90'},
  { id: 14, nome: 'Mochila Escolar', preco: 'R$ 159,90'},
  { id: 15, nome: 'Relógio Analógico', preco: 'R$ 249,90'},
]
</script>
