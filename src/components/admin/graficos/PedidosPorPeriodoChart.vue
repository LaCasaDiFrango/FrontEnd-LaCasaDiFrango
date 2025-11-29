<template>
  <div class="bg-white  rounded-2xl p-4 w-full max-w-3xl mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Pedidos últimos 7 dias
    </h2>
    <canvas ref="chartRef" height="150"></canvas>
    <div v-if="loading" class="text-center text-gray-500 mt-2">Carregando gráfico...</div>
    <div v-if="error" class="text-center text-red-500 mt-2">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js"
import { usePedidosStore } from '@/stores/index'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

const chartRef = ref(null)
let chartInstance = null

const store = usePedidosStore()
const loading = ref(false)
const error = ref(null)

const criarGrafico = (labels, data) => {
  const ctx = chartRef.value.getContext("2d")
  const gradient = ctx.createLinearGradient(0, 0, 0, 150)
  gradient.addColorStop(0, "rgba(59,130,246,0.4)")
  gradient.addColorStop(1, "rgba(59,130,246,0.05)")

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Pedidos",
          data,
          fill: true,
          backgroundColor: gradient,
          borderColor: "#3b82f6",
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#3b82f6",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#111827",
          titleColor: "#fff",
          bodyColor: "#e5e7eb",
          borderWidth: 1,
          borderColor: "#3b82f6",
          padding: 10,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#6b7280", font: { size: 12 } } },
        y: { grid: { color: "rgba(107,114,128,0.1)" }, ticks: { color: "#6b7280", font: { size: 12 } } },
      },
    },
  })
}

const formatarData = (dateStr) => {
  const date = new Date(dateStr)
  // pega componentes da data direto, sem conversão de fuso
  const dia = date.getUTCDate()       // pega dia UTC
  const mes = date.getUTCMonth() + 1  // pega mês UTC
  return `${String(dia).padStart(2,'0')}/${String(mes).padStart(2,'0')}`
}


// Watch para atualizar gráfico quando os dados chegarem
watch(
  () => store.ultimos7Dias,
  (val) => {
    if (val.length) {
      const labels = val.map(item => formatarData(item.dia))
      const data = val.map(item => item.total)
      criarGrafico(labels, data)
    }
  },
  { deep: true }
)

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    await store.fetchUltimos7Dias()
  } catch (err) {
    console.error(err)
    error.value = 'Erro ao carregar gráfico.'
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 450px !important;
}
</style>
