<template>
  <div class="p-4 w-full max-w-md mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Métodos de Pagamento Mais Usados
    </h2>
    <canvas ref="chartRef" height="150"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
} from "chart.js"

Chart.register(PieController, ArcElement, Tooltip)

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = chartRef.value.getContext("2d")

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Cartão", "Pix", "Boleto", "Dinheiro"],
      datasets: [
        {
          data: [40, 25, 15, 20],
          backgroundColor: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#6b7280", font: { size: 12 } },
        },
        tooltip: {
          backgroundColor: "#111827",
          titleColor: "#fff",
          bodyColor: "#e5e7eb",
          borderWidth: 1,
          borderColor: "#3b82f6",
          padding: 10,
        },
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
  height: 400px !important;
}
</style>
