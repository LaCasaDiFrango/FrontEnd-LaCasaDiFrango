<template>
  <div class="w-full max-w-5xl mx-auto bg-gradient-to-br  p-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center tracking-tight">
      Usurios Mais Ativos
    </h2>

    <!-- Pódio -->
    <div v-if="topTres.length" class="flex justify-center items-end gap-6 mb-10">
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
        <div
          class="mt-1 text-xs font-semibold text-gray-500"
          :class="rankColor(index)"
        >
          {{ posicaoLabel(index) }}
        </div>
      </div>
    </div>

    <!-- Gráfico -->
    <div v-if="loadingTopUsuarios" class="text-center py-8 text-gray-500 animate-pulse">
      Carregando gráfico...
    </div>

    <div v-else-if="errorTopUsuarios" class="text-center py-8 text-red-500 font-medium">
      {{ errorTopUsuarios }}
    </div>

    <div v-else class="relative h-[420px] bg-white rounded-2xl shadow-inner p-4">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useUsuariosStore } from '@/stores/admin/pages/usuarioStore'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useUsuariosStore()

onMounted(() => {
  store.fetchTopUsuarios()
})

// Top 3 usuários
const topTres = computed(() => store.topUsuarios.slice(0, 3))

// Dados do gráfico
const chartData = computed(() => ({
  labels: store.topUsuarios.map(u => u.name || 'Sem nome'),
  datasets: [
    {
      label: 'Total de Pedidos',
      data: store.topUsuarios.map(u => u.total_pedidos),
      backgroundColor: [
        'rgba(255, 215, 0, 0.7)', // ouro
        'rgba(192, 192, 192, 0.7)', // prata
        'rgba(205, 127, 50, 0.7)', // bronze
        ...Array(7).fill('rgba(59,130,246,0.5')
      ],
      borderRadius: 8,
      borderWidth: 0,
   
    }
  ]
}))

// Opções do gráfico limpo
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.parsed.y} pedidos`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: true },
      ticks: {
        color: '#4B5563',
        font: { size: 11 }
      }
    },
    y: {
      beginAtZero: true,
      grid: { display: false }, 
      border: { display: false },
      ticks: { display: false } 
    }
  }
}

// Estilo do pódio
const podioClass = (index) => {
  return [
    index === 0 ? 'bg-gradient-to-t from-yellow-500 to-yellow-300' : '',
    index === 1 ? 'bg-gradient-to-t from-gray-400 to-gray-200' : '',
    index === 2 ? 'bg-gradient-to-t from-amber-700 to-amber-500' : '',
    'transition-all'
  ]
}

const podioHeight = (index) => {
  return index === 0 ? '150px' : index === 1 ? '110px' : '90px'
}

const rankColor = (index) => {
  return index === 0
    ? 'text-yellow-600'
    : index === 1
    ? 'text-gray-500'
    : 'text-amber-700'
}

const posicaoLabel = (index) => {
  return index === 0 ? '🥇 1º Lugar' : index === 1 ? '🥈 2º Lugar' : '🥉 3º Lugar'
}

const { loadingTopUsuarios, errorTopUsuarios } = store
</script>

<style scoped>
canvas {
  border-radius: 12px;
}
</style>
