<script setup>
import { ref, computed, defineProps } from 'vue'

// Define props para o componente
const props = defineProps({
  produtos: {
    type: Array,
    default: () => [
      { id: 1, nome: 'Frango Assado', categoria: 'Comida', vendas: 120, preco: 'R$25,00' },
      { id: 2, nome: 'Coca-Cola 2L', categoria: 'Bebida', vendas: 95, preco: 'R$10,00' },
      { id: 3, nome: 'Frango com Maionese', categoria: 'Comida', vendas: 80, preco: 'R$27,00' },
      { id: 4, nome: 'Suco Natural', categoria: 'Bebida', vendas: 60, preco: 'R$8,00' },
      { id: 5, nome: 'Frango Desfiado', categoria: 'Comida', vendas: 55, preco: 'R$22,00' },
      { id: 6, nome: 'Farofa', categoria: 'Acompanhamento', vendas: 45, preco: 'R$5,00' },
      { id: 7, nome: 'Costela Assada', categoria: 'Comida', vendas: 30, preco: 'R$30,00' },
      { id: 8, nome: 'Refrigerante Lata', categoria: 'Bebida', vendas: 25, preco: 'R$6,00' },
      { id: 9, nome: 'Maionese Tradicional', categoria: 'Acompanhamento', vendas: 20, preco: 'R$7,00' },
      { id: 10, nome: 'Salada Verde', categoria: 'Acompanhamento', vendas: 15, preco: 'R$12,00' },
    ]
  }
})

const filtro = ref('')

// Computed para filtrar produtos com base no input
const produtosFiltrados = computed(() =>
  props.produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(filtro.value.toLowerCase()) ||
      p.categoria.toLowerCase().includes(filtro.value.toLowerCase())
  )
)
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full min-h-[475px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">Top 10 Produtos Mais Vendidos</h2>
      <input
        v-model="filtro"
        type="text"
        placeholder="Filtrar..."
        class="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]-600"
      />
    </div>

    <table class="w-full text-sm text-left">
      <thead>
        <tr class="text-gray-500 border-b border-gray-200">
          <th class="py-2">#</th>
          <th class="py-2">Nome</th>
          <th class="py-2">Categoria</th>
          <th class="py-2 text-center">Vendas</th>
          <th class="py-2 text-center">Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="p in produtosFiltrados"
          :key="p.id"
          class="border-b border-gray-100 hover:bg-gray-50 transition"
        >
          <td class="py-2">{{ p.id }}</td>
          <td class="py-2 font-medium text-gray-700">{{ p.nome }}</td>
          <td class="py-2 text-gray-600">{{ p.categoria }}</td>
          <td class="py-2 text-center text-gray-800 font-semibold">{{ p.vendas }}</td>
          <td class="py-2 text-center text-gray-700">{{ p.preco }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
