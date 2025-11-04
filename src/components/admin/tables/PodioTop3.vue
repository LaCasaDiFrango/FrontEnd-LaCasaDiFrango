<template>
  <div v-if="topTres.length" class="flex justify-center items-end gap-8 mb-10 bg-white p-20 rounded-lg shadow-md ">
    <div
      v-for="(usuario, index) in topTres"
      :key="usuario.id"
      class="flex flex-col items-center text-center"
    >
      <div
        class="relative w-24 flex items-center justify-center rounded-t-2xl text-white font-semibold shadow-lg transition-transform hover:-translate-y-1"
        :class="podioClass(index)"
        :style="{ height: podioHeight(index) }"
      >
        <span class="text-lg z-10 drop-shadow-sm">{{ usuario.total_pedidos }}</span>
        <div class="absolute bottom-1 text-xs opacity-80">pedidos</div>
      </div>

      <div class="mt-2 text-sm text-gray-700 font-medium truncate w-24">
        {{ usuario.name || 'Sem nome' }}
      </div>

      <div class="mt-1 text-xs font-semibold text-gray-500" :class="rankColor(index)">
        {{ posicaoLabel(index) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUsuariosStore } from '@/stores/admin/pages/usuarioStore'

const store = useUsuariosStore()

const topTres = computed(() => store.topUsuarios.slice(0, 3))

const podioClass = (index) => [
  index === 0 ? 'bg-gradient-to-t from-yellow-500 to-yellow-300' : '',
  index === 1 ? 'bg-gradient-to-t from-gray-400 to-gray-200' : '',
  index === 2 ? 'bg-gradient-to-t from-amber-700 to-amber-500' : '',
  'transition-all'
]

const podioHeight = (index) => (index === 0 ? '150px' : index === 1 ? '110px' : '90px')

const rankColor = (index) =>
  index === 0
    ? 'text-yellow-600'
    : index === 1
    ? 'text-gray-500'
    : 'text-amber-700'

const posicaoLabel = (index) => (index === 0 ? '🥇 1º Lugar' : index === 1 ? '🥈 2º Lugar' : '🥉 3º Lugar')
</script>
