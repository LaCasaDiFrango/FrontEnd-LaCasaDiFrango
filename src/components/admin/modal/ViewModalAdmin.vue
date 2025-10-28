<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  show: { type: Boolean, required: true },
  item: { type: Object, default: () => ({}) },
  dataKey: { type: String, required: true },
  modalTitle: { type: String, default: '' },
})

// Emits
const emit = defineEmits(['close'])

// Mapas de exibição
const statusMap = { 1: 'Carrinho', 2: 'Realizado', 3: 'Pago', 4: 'Entregue' }
const perfilMap = { administrador: 'Administrador', usuario: 'Usuário' }

// Formatação
const formatPrice = (val) => Number(val ?? 0).toFixed(2).replace('.', ',')

// Classes de badge
const statusBadgeClass = (status) => ({
  'bg-yellow-200 text-yellow-800': status === 1,
  'bg-blue-200 text-blue-800': status === 2,
  'bg-green-200 text-green-800': status === 3,
  'bg-emerald-300 text-emerald-800': status === 4
})

const perfilBadgeClass = (perfil) => ({
  'bg-emerald-200 text-emerald-800': perfil === 'administrador',
  'bg-blue-200 text-blue-800': perfil === 'usuario',
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="relative bg-white rounded-2xl shadow-xl p-6 w-[550px] max-h-[80vh] flex flex-col overflow-y-auto">
      
      <!-- Botão fechar -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
        title="Fechar"
      >
        <img class="w-5 h-auto" src="@/assets/img/icons/close.svg" alt="Fechar" />
      </button>

      <h3 class="text-xl font-semibold mb-4">{{ modalTitle }}</h3>

      <div class="flex-1 overflow-y-auto">
        <!-- Pedido -->
        <template v-if="dataKey === 'pedidos' && item?.itens?.length">
          <div class="mb-3">
            <span class="font-semibold text-gray-700">Usuário:</span>
            <span class="ml-2 text-gray-600">{{ item.usuario }}</span>
          </div>
          <div class="mb-3">
            <span class="font-semibold text-gray-700">Status:</span>
            <span
              class="ml-2 px-3 py-1 rounded-full text-xs font-semibold"
              :class="statusBadgeClass(item.status)"
            >
              {{ statusMap[item.status] }}
            </span>
          </div>
          <h4 class="font-semibold text-gray-800 mb-2">Itens do Pedido</h4>
          <table class="w-full text-sm border-separate" style="border-spacing: 0 6px">
            <thead>
              <tr class="text-gray-600 border-b border-gray-200">
                <th class="text-left py-2 px-2">Produto</th>
                <th class="text-center py-2 px-2">Qtd</th>
                <th class="text-center py-2 px-2">Preço</th>
                <th class="text-center py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(i, idx) in item.itens"
                :key="idx"
                class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg"
              >
                <td class="py-2 px-2 flex items-center gap-3 text-gray-800">
                  <img :src="i.produto.imagem" alt="Produto" class="w-10 h-10 object-cover rounded-lg" />
                  <span>{{ i.produto.nome }}</span>
                </td>
                <td class="py-2 px-2 text-center font-medium">{{ i.quantidade }}</td>
                <td class="py-2 px-2 text-center text-gray-700">R$ {{ formatPrice(i.produto.preco) }}</td>
                <td class="py-2 px-2 text-center text-gray-700">R$ {{ formatPrice(i.total) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-4 flex justify-end items-center font-bold text-green-700">
            Total Geral: R$ {{ formatPrice(item.itens.reduce((acc,i)=>acc+Number(i.total),0)) }}
          </div>
        </template>

        <!-- Produto -->
        <template v-else-if="dataKey === 'produtos' && item">
          <div class="flex flex-col gap-3">
            <img :src="item.imagem" alt="Produto" class="w-32 h-32 object-cover rounded-lg mx-auto" />
            <div><span class="font-semibold">Nome:</span> {{ item.nome }}</div>
            <div><span class="font-semibold">Preço:</span> R$ {{ formatPrice(item.preco) }}</div>
            <div><span class="font-semibold">Quantidade em estoque:</span> {{ item.quantidade_em_estoque }}</div>
          </div>
        </template>

        <!-- Usuário -->
        <template v-else-if="dataKey === 'usuarios' && item">
          <div class="flex flex-col gap-3">
            <div><span class="font-semibold">Nome:</span> {{ item.name || "Usuário sem nome" }}</div>
            <div><span class="font-semibold">Email:</span> {{ item.email }}</div>
            <div>
              <span class="font-semibold">Perfil:</span>
              <span
                class="ml-2 px-3 py-1 rounded-full text-xs font-semibold"
                :class="perfilBadgeClass(item.perfil)"
              >
                {{ perfilMap[item.perfil] || item.perfil }}
              </span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="text-center text-gray-400 italic">Sem dados para exibir.</div>
        </template>
      </div>
    </div>
  </div>
</template>
