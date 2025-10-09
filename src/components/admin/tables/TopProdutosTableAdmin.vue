<script setup>
import { computed } from 'vue'

// Recebe os produtos do pai
const props = defineProps({
  produtos: {
    type: Array,
    default: () => [],
  },
})

const produtosFiltrados = computed(() => props.produtos)
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full min-h-[475px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">Top 10 Produtos Mais Vendidos</h2>
    </div>

    <table class="w-full text-sm text-left">
      <thead>
        <tr class="text-gray-500 border-b border-gray-200">
          <th class="py-2">#</th>
          <th class="py-2">Nome</th>
          <th class="py-2 text-center">Vendas</th>
          <th class="py-2 text-center">Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(p, index) in produtosFiltrados"
          :key="p.id"
          class="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td class="py-2">{{ index + 1 }}</td>
          <td class="py-2 font-medium text-gray-700">{{ p.nome }}</td>
          <td class="py-2 text-center text-gray-800 font-semibold">{{ p.total_vendido }}</td>
          <td class="py-2 text-center text-gray-800 font-semibold">R$ {{ p.preco }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="produtosFiltrados.length === 0" class="text-center text-gray-400 mt-4">
      Nenhum produto vendido ainda.
    </div>
  </div>
</template>
