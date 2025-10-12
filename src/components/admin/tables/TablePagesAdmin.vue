<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
  },
  title: {
    type: String,
  },
})

// Campo de filtro
const filtro = ref('')

// Lista filtrada
const itemsList = computed(() => {
  if (!filtro.value) return props.items
  return props.items.filter(item =>
    item.nome.toLowerCase().includes(filtro.value.toLowerCase()) ||
    item.id.toString().includes(filtro.value)
  )
})
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full min-h-[475px]">
    <!-- Cabeçalho com filtro -->
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
    <table class="w-full text-sm border-separate" style="border-spacing: 0 6px;">
      <thead>
        <tr class="text-gray-500 border-b border-gray-200">
          <th class="py-2 px-3 text-center font-semibold w-[60px]">#</th>
          <th class="py-2 px-3 text-left font-semibold">Nome</th>
          <th class="py-2 px-3 text-left font-semibold">{{ label }}</th>
          <th class="py-2 px-3 text-center font-semibold w-[140px]">Administração</th>
        </tr>
      </thead>

      <!-- Usando transition-group -->
      <transition-group
        tag="tbody"
        name="fade-slide"
      >
        <tr
          v-for="(p, index) in itemsList"
          :key="p.id || index"
          class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg"
        >
          <td class="py-2 text-center text-gray-700 rounded-l-lg">{{ p.id }}</td>
          <td class="py-2 text-left font-medium text-gray-700">{{ p.nome }}</td>
          <td class="py-2 text-left text-gray-800 font-semibold">{{ p.preco }}</td>
          <td class="py-2 text-center rounded-r-lg">
            <div class="flex justify-center items-center gap-3">
              <button title="Editar"><img class="p-1 bg-[#facc15] w-7 h-auto rounded transition" src="@/assets/img/icons/edit.svg" alt="Edit"></button>
              <button title="Excluir"><img class="p-1 bg-[#B91C1C] w-7 h-auto rounded transition" src="@/assets/img/icons/delete.svg" alt="Delete"></button>
              <button title="Ver"><img class="p-1 bg-teal-500 w-7 h-auto rounded transition" src="@/assets/img/icons/view.svg" alt="View"></button>
            </div>
          </td>
        </tr>
      </transition-group>
    </table>

    <div v-if="itemsList.length === 0" class="text-center text-gray-400 mt-4 italic">
      Nenhum registro encontrado.
    </div>
  </div>
</template>

<style>
/* Transição de fade + slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
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
