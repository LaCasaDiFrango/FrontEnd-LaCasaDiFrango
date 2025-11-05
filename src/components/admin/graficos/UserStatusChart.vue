<template>
  <div class="p-4 w-full max-w-md mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Usuários Ativos vs Inativos
    </h2>
    <canvas ref="chartRef" height="150"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { Chart, PieController, ArcElement, Tooltip } from "chart.js"
import { useUsuariosStore } from "@/stores/index"

Chart.register(PieController, ArcElement, Tooltip)

const chartRef = ref(null)
let chartInstance = null

// Pinia store
const usuariosStore = useUsuariosStore()

// Função para criar ou atualizar o gráfico
function renderChart() {
  const ctx = chartRef.value.getContext("2d")
  const data = [usuariosStore.ativos, usuariosStore.inativos]

  if (chartInstance) {
    chartInstance.data.datasets[0].data = data
    chartInstance.update()
  } else {
    chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Ativos", "Inativos"],
        datasets: [
          {
            data,
            backgroundColor: ["#3b82f6", "#93c5fd"],
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
  }
}

// Busca os dados do backend e renderiza o gráfico
onMounted(async () => {
  await usuariosStore.fetchUsuariosAtivosInativos()
  renderChart()
})

// Atualiza o gráfico sempre que os valores mudarem
watch(
  () => [usuariosStore.ativos, usuariosStore.inativos],
  () => {
    renderChart()
  }
)

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 350px !important;
}
</style>
