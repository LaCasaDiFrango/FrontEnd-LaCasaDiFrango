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
            :items="items"
            :columns="columns"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { NavLateralAdmin, TitleAdmin, ButtonActionAdmin, InfoCardAdmin, TablePagesAdmin } from '@/components/index'
import { useDashboardTitleStore, usePedidosStore, useProdutosStore, useUsuariosStore } from '@/stores/index'

const dashboardTitleStore = useDashboardTitleStore()

const props = defineProps({
  pageTitle: String,
  dataKey: String, // 'produtos' | 'usuarios' | 'pedidos'
  columns: Array,
  actions: Object
})

// Mapa de stores
const storesMap = {
  produtos: useProdutosStore(),
  usuarios: useUsuariosStore(),
  pedidos: usePedidosStore()
}

// Mapa de fetch
const fetchMap = {
  produtos: () => storesMap.produtos.fetchProdutos?.(),
  usuarios: () => storesMap.usuarios.fetchUsuarios?.(),
  pedidos: () => storesMap.pedidos.fetchPedidos?.()
}

// Computed para store atual
const store = computed(() => storesMap[props.dataKey])

// Computed para items
const items = computed(() => {
  if (!store.value) return []
  if (props.dataKey === 'produtos') return store.value.produtos
  if (props.dataKey === 'usuarios') return store.value.usuarios
  if (props.dataKey === 'pedidos') return store.value.pedidos
  return []
})

// Watch para atualizar quando dataKey mudar
watch(
  () => props.dataKey,
  async (newKey) => {
    console.log('[DEBUG] dataKey mudou para:', newKey)
    const fetchFn = fetchMap[newKey]
    if (fetchFn) {
      try {
        store.value.loading = true
        await fetchFn()
      } catch (err) {
        console.error(`[DashboardPagesAdmin] Erro ao carregar ${newKey}:`, err)
      } finally {
        store.value.loading = false
      }
    }
  },
  { immediate: true }
)
</script>

