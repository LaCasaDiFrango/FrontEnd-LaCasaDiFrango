<template>
  <div class="w-full max-w-5xl mx-auto bg-gradient-to-br p-8">

    <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center tracking-tight">
      Usuários Mais Ativos
    </h2>

    <!-- Pódio separado -->
    <PodioTop3 :topTres="topTres" />

    <!-- estados -->
    <div v-if="loadingTopUsuarios" class="text-center py-8 text-gray-500 animate-pulse">
      Carregando gráfico...
    </div>

    <div v-else-if="errorTopUsuarios" class="text-center py-8 text-red-500 font-medium">
      {{ errorTopUsuarios }}
    </div>

    <!-- Gráfico -->
    <div v-else class="relative h-[520px] bg-white rounded-2xl shadow-inner p-4">
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

const topTres = computed(() => store.topUsuarios.slice(0, 3))

const chartData = computed(() => ({
  labels: store.topUsuarios.map(u => u.name || 'Sem nome'),
  datasets: [
    {
      label: 'Pedidos',
      data: store.topUsuarios.map(u => u.total_pedidos),
      borderRadius: 6,
      borderWidth: 0,
      backgroundColor: (ctx) => {
        const idx = ctx.dataIndex
        if (idx === 0) return 'rgba(255,215,0,0.7)'
        if (idx === 1) return 'rgba(192,192,192,0.7)'
        if (idx === 2) return 'rgba(205,127,50,0.7)'
        return 'rgba(59,130,246,0.5)'
      }
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',   // <--------- HORIZONTAL
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.raw} pedidos`
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        color: '#4B5563'
      }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: '#4B5563',
        font: { size: 12 }
      }
    }
  }
}

const { loadingTopUsuarios, errorTopUsuarios } = store
</script>
