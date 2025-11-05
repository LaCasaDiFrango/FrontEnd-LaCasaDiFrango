<template>
  <div class="bg-white p-4 w-full max-w-3xl mx-auto">
    <h2 class="text-lg font-semibold text-gray-800 mb-3 text-center">
      Previsão de Falta no Estoque
    </h2>
    <canvas ref="chartRef" height="150"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useProdutosStore } from "@/stores/admin/pages/produtoStore"
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
const produtosStore = useProdutosStore()

// Função para definir cor por estoque
const corPorEstoque = (quantidade) => {
  if (quantidade <= 3) return "rgba(239,68,68,0.7)" // vermelho crítico
  if (quantidade <= 7) return "rgba(234,179,8,0.7)" // amarelo baixo
  return "rgba(59,130,246,0.5)" // azul claro
}

// Atualiza gráfico
const atualizarGrafico = () => {
  const produtosCriticos = produtosStore.produtos.filter(p => p.quantidade_em_estoque < 10)
  const labels = produtosCriticos.map(p => p.nome)
  const data = produtosCriticos.map(p => p.quantidade_em_estoque)
  const cores = data.map(qt => corPorEstoque(qt))

  const ctx = chartRef.value.getContext("2d")

  if (chartInstance) {
    chartInstance.data.labels = labels
    chartInstance.data.datasets[0].data = data
    chartInstance.data.datasets[0].backgroundColor = cores
    chartInstance.update()
  } else {
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Qtd. Estoque",
            data,
            backgroundColor: cores,
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
  }
}

onMounted(async () => {
  await produtosStore.fetchProdutos()
  atualizarGrafico()
})

watch(() => produtosStore.produtos, atualizarGrafico, { deep: true })

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
