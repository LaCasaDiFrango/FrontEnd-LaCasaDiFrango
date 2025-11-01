<template>
  <div class="bg-white shadow-md rounded-2xl p-4 w-full max-w-3xl mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Top Usuários por Pedidos
    </h2>
    <canvas ref="chartRef" height="180"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { usePedidosStore } from "@/stores/admin/pages/pedidoStore" // store que contém todos os pedidos
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Filler,
} from "chart.js"

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Filler)

const chartRef = ref(null)
let chartInstance = null

const pedidosStore = usePedidosStore()

const atualizarGrafico = () => {
  // Conta pedidos por usuário
  const contagem = {}
  pedidosStore.pedidos.forEach(p => {
    const usuario = p.usuario.nome // ou p.usuarioId se só tiver ID
    contagem[usuario] = (contagem[usuario] || 0) + 1
  })

  // Ordena e pega top 5
  const topUsuarios = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const labels = topUsuarios.map(([nome]) => nome)
  const data = topUsuarios.map(([, qtd]) => qtd)

  const ctx = chartRef.value.getContext("2d")
  const gradient = ctx.createLinearGradient(0, 0, 0, 180)
  gradient.addColorStop(0, "rgba(59,130,246,0.4)")
  gradient.addColorStop(1, "rgba(59,130,246,0.05)")

  if (chartInstance) {
    chartInstance.data.labels = labels
    chartInstance.data.datasets[0].data = data
    chartInstance.data.datasets[0].backgroundColor = gradient
    chartInstance.update()
  } else {
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
            pointRadius: 5,
            pointHoverRadius: 7,
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
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280", font: { size: 12 } },
          },
          y: {
            grid: { color: "rgba(107,114,128,0.1)" },
            ticks: { color: "#6b7280", font: { size: 12 } },
          },
        },
      },
    })
  }
}

onMounted(async () => {
  await pedidosStore.fetchPedidos() // busca todos os pedidos
  atualizarGrafico()
})

watch(() => pedidosStore.pedidos, atualizarGrafico, { deep: true })

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 480px !important;
}
</style>
