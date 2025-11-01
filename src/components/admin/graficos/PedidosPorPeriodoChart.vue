<template>
  <div class="bg-white shadow-md rounded-2xl p-4 w-full max-w-3xl mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Pedidos por Semana
    </h2>
    <canvas ref="chartRef" height="150"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
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

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = chartRef.value.getContext("2d")
  const gradient = ctx.createLinearGradient(0, 0, 0, 150)
  gradient.addColorStop(0, "rgba(59,130,246,0.4)")
  gradient.addColorStop(1, "rgba(59,130,246,0.05)")

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      datasets: [
        {
          label: "Pedidos",
          data: [12, 19, 14, 23, 20, 18, 15],
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
