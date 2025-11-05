<script setup>
import { computed, ref } from 'vue'
import { ViewModalAdmin, ConfirmDeleteModal } from '@/components/index'
import { usePedidosStore, useUsuariosStore, useProdutosStore } from '@/stores/index'

// Props
const props = defineProps({
  columns: { type: Array, default: () => [] },
  title: { type: String },
  dataKey: { type: String, required: true },
  items: { type: Array, default: () => [] }, // Vem da view
  currentPage: { type: Number, default: 1 }, // Vem da view
  totalPages: { type: Number, default: 1 }, // Vem da view
})

// Emits
const emit = defineEmits(['edit', 'view', 'delete', 'save'])

// Stores para PATCH/PUT
const pedidosStore = usePedidosStore()
const usuariosStore = useUsuariosStore()
const produtosStore = useProdutosStore()
const storesMap = { pedidos: pedidosStore, usuarios: usuariosStore, produtos: produtosStore }

// Estado interno
const filtro = ref('')
const selectedItem = ref(null)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Filtragem local
const itemsList = computed(() => {
  if (!filtro.value) return props.items
  return props.items.filter((item) =>
    props.columns.some((col) =>
      (item[col.key]?.toString() ?? '').toLowerCase().includes(filtro.value.toLowerCase())
    )
  )
})

// Colunas
const primaryKeys = ['nome', 'name', 'usuario', 'email']
const otherColumns = computed(() => props.columns.filter((col) => !primaryKeys.includes(col.key)))

// Mapas de exibição
const statusMap = { 1: 'Carrinho', 2: 'Realizado', 3: 'Pago', 4: 'Entregue' }
const perfilMap = { administrador: 'Administrador', usuario: 'Usuário' }

const getDisplayName = (item) => item.nome || item.usuario || item.email || '—'
const getDisplayValue = (item, key) => {
  if (key === 'status') return statusMap[item[key]] || item[key] || '—'
  if (key === 'perfil') return perfilMap[item[key]] || item[key] || '—'
  if (key === 'preco')
    return `R$ ${Number(item[key] ?? 0)
      .toFixed(2)
      .replace('.', ',')}`
  return item[key] ?? '—'
}

// Ações
const openEdit = (item) => {
  selectedItem.value = item
  showEditModal.value = true
  emit('edit', item)
}
const openView = (item) => {
  selectedItem.value = item
  showViewModal.value = true
  emit('view', item)
}
const deleteItem = (item) => {
  if (confirm(`Deseja excluir #${item.id}?`)) emit('delete', item)
}

// Modal title
const modalTitle = computed(() => {
  if (!selectedItem.value) return ''
  if (props.dataKey === 'pedidos') return `Pedido #${selectedItem.value.id}`
  if (props.dataKey === 'produtos') return `Produto`
  if (props.dataKey === 'usuarios') return `Usuário`
  return 'Detalhes'
})

// PATCH/PUT via tabela
const handleSave = async (updatedItem) => {
  const store = storesMap[props.dataKey]
  try {
    if (props.dataKey === 'produtos') {
      await store.atualizarPreco(updatedItem.id, updatedItem.preco)
      await produtosStore.atualizarQuantidadeAbsoluta(
        updatedItem.id,
        updatedItem.quantidade_em_estoque
      )
    } else if (props.dataKey === 'usuarios') {
      await store.updateUsuario(updatedItem.id, updatedItem)
    } else if (props.dataKey === 'pedidos') {
      await store.updatePedido(updatedItem.id, updatedItem)
    }
    showEditModal.value = false
    emit('save', updatedItem)
  } catch (err) {
    console.error(err)
    alert('Erro ao salvar item.')
  }
}

const openDeleteModal = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const confirmDelete = (item) => {
  emit('delete', item)
  showDeleteModal.value = false
}
</script>


  <template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full min-h-[475px]">
    <!-- Cabeçalho -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <input
        v-model="filtro"
        type="text"
        placeholder="Filtrar..."
        class="border border-gray-300 rounded-lg px-3 py-1 text-sm ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b3d1f] transition"
      />
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-separate min-w-[600px]" style="border-spacing: 0 6px">
        <thead>
          <tr class="text-gray-500 border-b border-gray-200">
            <th class="py-2 px-3 text-center font-semibold w-[60px]">#</th>
            <th class="py-2 px-3 text-left font-semibold">Nome</th>
            <th
              v-for="col in otherColumns"
              :key="col.key"
              class="py-2 px-3 text-center font-semibold"
            >
              {{ col.label }}
            </th>
            <th class="py-2 px-3 text-center font-semibold w-[140px]">Administração</th>
          </tr>
        </thead>

        <transition-group tag="tbody" name="fade-slide">
          <tr
            v-for="(item, index) in itemsList"
            :key="item.id || index"
            class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg"
          >
            <td class="py-2 text-center text-gray-700 rounded-l-lg">{{ item.id }}</td>
            <td class="py-2 text-left font-medium text-gray-700">{{ getDisplayName(item) }}</td>
            <td
              v-for="col in otherColumns"
              :key="col.key"
              class="py-2 text-center text-gray-800 font-semibold"
            >
              {{ getDisplayValue(item, col.key) }}
            </td>

            <td class="py-2 text-center rounded-r-lg">
              <div class="flex justify-center items-center gap-3">
                <button @click="openEdit(item)" title="Editar">
                  <img
                    class="p-1 bg-[#facc15] w-7 rounded transition hover:scale-105"
                    src="@/assets/img/icons/edit.svg"
                    alt="Edit"
                  />
                </button>
                <button @click="openDeleteModal(item)" title="Excluir">
                  <img
                    class="p-1 bg-[#B91C1C] w-7 rounded transition hover:scale-105"
                    src="@/assets/img/icons/delete.svg"
                    alt="Delete"
                  />
                </button>

                <button @click="openView(item)" title="Ver">
                  <img
                    class="p-1 bg-teal-500 w-7 rounded transition hover:scale-105"
                    src="@/assets/img/icons/view.svg"
                    alt="View"
                  />
                </button>
              </div>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>

    <div v-if="itemsList.length === 0" class="text-center text-gray-400 mt-4 italic">
      Nenhum registro encontrado.
    </div>

    <!-- Paginação -->
    <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 space-x-2">
      <button
        @click="emit('page-change', currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span class="px-3 py-1 text-gray-800"> Página {{ currentPage }} de {{ totalPages }} </span>
      <button
        @click="emit('page-change', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
    <!-- Modal de visualizar -->
    <ViewModalAdmin
      :show="showViewModal"
      :item="selectedItem"
      :dataKey="dataKey"
      :modalTitle="modalTitle"
      :startEditing="false"
      @close="showViewModal = false"
    />

    <!-- Modal de editar -->
    <ViewModalAdmin
      :show="showEditModal"
      :item="selectedItem"
      :dataKey="dataKey"
      :modalTitle="modalTitle"
      :startEditing="true"
      @close="showEditModal = false"
      @save="handleSave"
    />

    <ConfirmDeleteModal
      :show="showDeleteModal"
      :item="itemToDelete"
      :title="`Excluir ${modalTitle}`"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>


  <style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
