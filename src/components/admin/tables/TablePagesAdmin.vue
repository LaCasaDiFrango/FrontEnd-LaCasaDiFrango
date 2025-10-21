<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  title: { type: String },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 10 },
})

const emit = defineEmits(['page-change'])

const filtro = ref('')

// Filtra os itens pelo campo de busca
const itemsList = computed(() => {
  if (!filtro.value) return props.items
  return props.items.filter(item =>
    props.columns.some(col =>
      (item[col.key]?.toString() ?? '').toLowerCase().includes(filtro.value.toLowerCase())
    )
  )
})

// Colunas que não devem ser centralizadas
const primaryKeys = ['nome', 'name', 'usuario', 'email']

const otherColumns = computed(() =>
  props.columns.filter(col => !primaryKeys.includes(col.key))
)

// Mapas para exibição de valores legíveis
const statusMap = {
  1: 'Carrinho',
  2: 'Realizado',
  3: 'Pago',
  4: 'Entregue',
}

const perfilMap = {
  administrador: 'Administrador',
  usuario: 'Usuário',
}

// Retorna o nome principal
const getDisplayName = item => item.nome || item.usuario || item.email || '—'

// Retorna valores legíveis ou formatados
const getDisplayValue = (item, key) => {
  if (key === 'status') return statusMap[item[key]] || item[key] || '—'
  if (key === 'perfil') return perfilMap[item[key]] || item[key] || '—'
  if (key === 'preco') {
    const preco = Number(item[key] ?? 0)
    return `R$ ${preco.toFixed(2).replace('.', ',')}`
  }
  return item[key] ?? '—'
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
            <th v-for="col in otherColumns" :key="col.key" class="py-2 px-3 text-center font-semibold">
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
            <!-- ID -->
            <td class="py-2 text-center text-gray-700 rounded-l-lg">{{ item.id }}</td>

            <!-- Nome -->
            <td class="py-2 text-left font-medium text-gray-700">{{ getDisplayName(item) }}</td>

            <!-- Outras colunas -->
            <td
              v-for="col in otherColumns"
              :key="col.key"
              class="py-2 text-center text-gray-800 font-semibold"
            >
              {{ getDisplayValue(item, col.key) }}
            </td>

            <!-- Ações -->
            <td class="py-2 text-center rounded-r-lg">
              <div class="flex justify-center items-center gap-3">
                <button title="Editar">
                  <img
                    class="p-1 bg-[#facc15] w-7 h-auto rounded transition hover:scale-105"
                    src="@/assets/img/icons/edit.svg"
                    alt="Edit"
                  />
                </button>
                <button title="Excluir">
                  <img
                    class="p-1 bg-[#B91C1C] w-7 h-auto rounded transition hover:scale-105"
                    src="@/assets/img/icons/delete.svg"
                    alt="Delete"
                  />
                </button>
                <button title="Ver">
                  <img
                    class="p-1 bg-teal-500 w-7 h-auto rounded transition hover:scale-105"
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

    <!-- Nenhum registro -->
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
      <span class="px-3 py-1 text-gray-800">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      <button
        @click="emit('page-change', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
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
