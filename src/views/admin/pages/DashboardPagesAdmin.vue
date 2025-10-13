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
            :columns="columns"
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
  { id: 28, nome: 'Camiseta Oversized', preco: 'R$ 149,90', quantidade: 120, status: 'Ativo', perfil: 'Admin' },
  { id: 29, nome: 'Calça Jogger', preco: 'R$ 199,90', quantidade: 80, status: 'Inativo', perfil: 'Usuário' },
  { id: 30, nome: 'Tênis Running', preco: 'R$ 299,90', quantidade: 60, status: 'Ativo', perfil: 'Moderador' },
  { id: 31, nome: 'Jaqueta Corta-Vento', preco: 'R$ 249,90', quantidade: 50  , status: 'Ativo', perfil: 'Admin' },
  { id: 32, nome: 'Mochila de Couro', preco: 'R$ 399,90', quantidade: 30  , status: 'Ativo', perfil: 'Admin' },
  { id: 33, nome: 'Relógio Esportivo', preco: 'R$ 199,90', quantidade: 70  , status: 'Ativo', perfil: 'Admin' },
  { id: 34, nome: 'Óculos de Grau', preco: 'R$ 149,90', quantidade: 40  , status: 'Ativo', perfil: 'Admin' },
  { id: 35, nome: 'Camiseta Básica', preco: 'R$ 99,90', quantidade: 200 , status: 'Ativo', perfil: 'Admin'  },
  { id: 36, nome: 'Calça Social', preco: 'R$ 249,90', quantidade: 90  , status: 'Ativo', perfil: 'Admin' },
  { id: 37, nome: 'Tênis Casual', preco: 'R$ 199,90', quantidade: 110 , status: 'Ativo', perfil: 'Admin'  },
  { id: 38, nome: 'Jaqueta de Couro', preco: 'R$ 499,90', quantidade: 20  , status: 'Ativo', perfil: 'Admin' },
  { id: 39, nome: 'Mochila Escolar', preco: 'R$ 179,90', quantidade: 150 , status: 'Ativo', perfil: 'Admin'  },
  { id: 52, nome: 'Tênis Street', preco: 'R$ 399,90', quantidade: 75  , status: 'Ativo', perfil: 'Admin' },
  { id: 53, nome: 'Camisa Social', preco: 'R$ 199,90', quantidade: 95  , status: 'Ativo', perfil: 'Admin' },
]
</script>
