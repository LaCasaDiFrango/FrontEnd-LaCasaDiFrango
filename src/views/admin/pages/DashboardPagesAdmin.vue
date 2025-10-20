<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <!-- Título e subtítulo do dashboard -->
      <TitleAdmin
        :title="dashboardTitleStore.title"
        :subtitle="dashboardTitleStore.subtitle"
      />

      <!-- Cards e ações -->
      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] gap-6 justify-between items-center">
          <ButtonActionAdmin
            :acao="props.actions.addLabel"
            :showDropdown="!!props.actions.dropdown"
            :options="dropdownOptions"
            @click="handleAddClick"
          />

          <InfoCardAdmin
            :icon="imageEstatisca"
            title="Relatórios e Estatísticas"
            :value="props.actions.infoCardValue"
            :subtitle="props.actions.infoCardSubtitle"
          />
        </div>
      </div>

      <!-- Tabela de itens -->
      <div class="flex w-full justify-center items-center">
        <div class="flex-[0.9]">
          <TablePagesAdmin
            :title="dashboardTitleStore.tableTitle"
            :items="items"
            :currentPage="store.currentPage"
            :totalPages="store.totalPages"
            :itemsPerPage="store.itemsPerPage"
            :loading="loading"
            @page-change="store.setCurrentPage"
            :columns="props.columns"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  NavLateralAdmin,
  TitleAdmin,
  ButtonActionAdmin,
  InfoCardAdmin,
  TablePagesAdmin
} from '@/components/index'
import {
  useDashboardTitleStore,
  usePedidosStore,
  useProdutosStore,
  useUsuariosStore
} from '@/stores/index'
import { useRouter } from 'vue-router'
import imageEstatisca from '@/assets/img/admin/statistics-svgrepo-com.svg'

const props = defineProps({
  pageTitle: String,
  dataKey: String, // 'produtos' | 'usuarios' | 'pedidos'
  columns: Array,
  actions: Object,
})

const router = useRouter()
const dashboardTitleStore = useDashboardTitleStore()
const loading = ref(false)

// Handle botão "Adicionar"
function handleAddClick() {
  if (props.actions?.addRoute) {
    router.push(props.actions.addRoute)
  }
}

// Dropdown genérico
const dropdownOptions = computed(() => {
  if (!props.actions?.dropdown) return []
  return props.actions.dropdown.map(opt => ({
    ...opt,
    action: () => {
      if (opt.route) router.push(opt.route)
      else if (typeof opt.action === 'function') opt.action()
    }
  }))
})

// Mapa de stores
const storesMap = {
  produtos: useProdutosStore(),
  usuarios: useUsuariosStore(),
  pedidos: usePedidosStore()
}

// Mapa de funções de fetch
const fetchMap = {
  produtos: (page) => storesMap.produtos.ProdutosPage?.(page),
  usuarios: (page) => storesMap.usuarios.fetchUsuarios?.(page),
  pedidos: (page) => storesMap.pedidos.fetchPedidos?.(page)
}

// Store atual
const store = computed(() => storesMap[props.dataKey])

// Itens da tabela (genérico)
const items = computed(() => {
  if (!store.value) return []
  const key = props.dataKey
  if (key === 'produtos') return store.value.produtos || []
  if (key === 'usuarios') return store.value.usuarios || []
  if (key === 'pedidos') return store.value.pedidos || []
  return []
})

// Watch para recarregar ao mudar dataKey
watch(
  () => props.dataKey,
  async (newKey, oldKey) => {
    if (newKey && newKey !== oldKey) { // Garante que só executa se o dataKey realmente mudou
      const fetchFn = fetchMap[newKey]
      if (!fetchFn) return
      loading.value = true
      try {
        // Resetar a página atual para 1 ao mudar o dataKey e buscar os dados
        // Isso vai chamar fetchFn(1) via o watch de currentPage, se currentPage for diferente de 1
        // Se currentPage já for 1, a fetch é feita diretamente aqui.
        if (store.value.currentPage !== 1) {
          store.value.setCurrentPage(1)
        } else {
          await fetchFn(1)
        }
      } catch (err) {
        console.error(`[DashboardPagesAdmin] Erro ao carregar ${newKey}:`, err)
      } finally {
        loading.value = false
      }
    }
  },
  { immediate: true }
)

// Watch para chamar fetch quando a página atual da store é alterada
watch(
  () => store.value?.currentPage,
  (newPage, oldPage) => {
    // console.log(`[DashboardPagesAdmin] currentPage mudou para ${newPage}, oldPage: ${oldPage}`)
    if (newPage && newPage !== oldPage) {
      const fetchFn = fetchMap[props.dataKey]
      if (fetchFn) {
        fetchFn(newPage)
      }
    }
  }
)

// Carrega os dados iniciais quando o componente é montado
onMounted(() => {
  // Se o dataKey não mudou (primeira carga), garante que a fetch inicial seja feita
  if (!props.dataKey) return; // Evita erro se dataKey for undefined na montagem inicial
  const fetchFn = fetchMap[props.dataKey]
  if (fetchFn) {
    // Se a página atual da store já for 1, chama fetchFn diretamente
    // Caso contrário, setCurrentPage(1) será chamado pelo watch de dataKey ou um click do usuário
    if (store.value.currentPage === 1) {
      fetchFn(1)
    }
  }
})
</script>

