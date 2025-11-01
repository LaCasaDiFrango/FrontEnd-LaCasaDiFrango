<template>
  <div class="bg-white shadow-md rounded-2xl p-4 w-full max-w-3xl mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Previsão de Falta no Estoque
    </h2>
    <canvas ref="chartRef" height="150"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js"

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip)

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = chartRef.value.getContext("2d")
  const gradient = ctx.createLinearGradient(0, 0, 0, 150)
  gradient.addColorStop(0, "rgba(59,130,246,0.5)")
  gradient.addColorStop(1, "rgba(59,130,246,0.1)")

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Produto A", "Produto B", "Produto C", "Produto D", "Produto E"],
      datasets: [
        {
          label: "Qtd. Estoque",
          data: [12, 5, 8, 3, 6],
          backgroundColor: gradient,
          borderRadius: 6,
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
  height: 500px !important;
}
</style>
