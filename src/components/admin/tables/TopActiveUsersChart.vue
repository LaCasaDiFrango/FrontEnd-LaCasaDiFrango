<template>
  <div class="w-full max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
    <h2 class="text-xl font-semibold mb-4 text-center">Top 10 Usuários Mais Ativos</h2>

    <canvas ref="podioChart"></canvas>

    <div v-if="loadingTopUsuarios" class="text-center mt-4">Carregando...</div>
    <div v-if="errorTopUsuarios" class="text-red-500 text-center mt-4">{{ errorTopUsuarios }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useUsuariosStore } from '@/stores/index'

Chart.register(...registerables)

const podioChart = ref(null)
let chartInstance = null

const usuariosStore = useUsuariosStore()
const { topUsuarios, fetchTopUsuarios, loadingTopUsuarios, errorTopUsuarios } = usuariosStore

const renderChart = () => {
  if (!podioChart.value) return
  if (!topUsuarios.value || topUsuarios.value.length === 0) return // ✅ só renderiza se houver dados
  if (chartInstance) chartInstance.destroy()

  const labels = topUsuarios.value.map(u => u.name || u.email) // fallback se name não existir
  const data = topUsuarios.value.map(u => u.total_pedidos || 0)

  chartInstance = new Chart(podioChart.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Pedidos',
        data,
        backgroundColor: topUsuarios.value.map((_, idx) => {
          if (idx === 0) return '#FFD700' // ouro
          if (idx === 1) return '#C0C0C0' // prata
          if (idx === 2) return '#CD7F32' // bronze
          return '#4F46E5' // demais azul
        }),
        borderRadius: 6,
      }]
    },
    options: {
      indexAxis: 'y', // horizontal
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: { beginAtZero: true, title: { display: true, text: 'Pedidos' } },
        y: { ticks: { font: { size: 14 } } }
      }
    }
  })
}

onMounted(async () => {
  await fetchTopUsuarios()
  // Renderiza automaticamente via watch
})

watch(topUsuarios, (newVal) => {
  if (newVal && newVal.length > 0) renderChart()
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 400px !important;
}
</style>
