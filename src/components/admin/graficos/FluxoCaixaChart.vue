<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { usePedidosStore } from '@/stores/index'

import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Title,
} from "chart.js"

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Title)

const pedidosStore = usePedidosStore()

const chartRef = ref(null)
let chartInstance = null

onMounted(async () => {
  // busca os dados do backend (total_vendido por dia)
  await pedidosStore.fetchVendasUltimos7Dias()

  const dados = pedidosStore.vendasUltimos7Dias

  // labels: converte YYYY-MM-DD → DD/MM
  const labels = dados.map(item => {
    const partes = item.dia.split("-")
    return `${partes[2]}/${partes[1]}`
  })

  // valores: usa total_vendido do backend
  const valores = dados.map(item => item.total_vendido)

  const ctx = chartRef.value.getContext("2d")

  const gradient = ctx.createLinearGradient(0, 0, 0, 150)
  gradient.addColorStop(0, "rgba(59,130,246,0.5)")
  gradient.addColorStop(1, "rgba(59,130,246,0.1)")

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Faturamento (R$)",
          data: valores,
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
          callbacks: {
            label: (ctx) => `R$ ${ctx.raw.toFixed(2)}`
          }
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "rgba(107,114,128,0.1)" } },
      },
    },
  })
})

onBeforeUnmount(() => chartInstance?.destroy())
</script>

<template>
  <div class="w-full h-[500px]">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
  Valor gerado nos últimos 7 dias
</h2>

    <canvas ref="chartRef"></canvas>
  </div>
</template>
