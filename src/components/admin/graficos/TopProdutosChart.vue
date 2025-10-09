<script setup>
import { reactive, watch, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Props
const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({
      labels: [],
      datasets: [
        {
          label: 'Vendas',
          data: [],
          backgroundColor: [],
          borderRadius: 10,
        },
      ],
    }),
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#374151',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#4b5563', font: { weight: '500' } },
        },
        y: {
          grid: { color: '#e5e7eb' },
          ticks: { color: '#4b5563', stepSize: 1 },
          beginAtZero: true,
          grace: '10%',
        },
      },
    }),
  },
})

// Computed que cria cores automáticas por ranking
const reactiveChartData = computed(() => {
  if (
    !props.chartData ||
    !props.chartData.datasets ||
    !props.chartData.datasets[0] ||
    !props.chartData.labels
  ) {
    // fallback vazio para evitar erro
    return {
      labels: [],
      datasets: [
        {
          label: 'Vendas',
          data: [],
          backgroundColor: [],
          borderRadius: 10,
        },
      ],
    }
  }

  const data = [...props.chartData.datasets[0].data]
  const labels = [...props.chartData.labels]

  // Ordena índices pelo valor
  const sortedIndices = data.map((v, i) => i).sort((a, b) => data[b] - data[a])

  // Cria array de cores baseado no ranking
  const colors = data.map((_, i) => {
    const rank = sortedIndices.indexOf(i)
    if (rank === 0) return '#1b3d1f' // top1 verde
    if (rank === 1) return '#3b82f6' // top2 azul
    if (rank === 2) return '#facc15' // top3 amarelo
    return '#B91C1C'                 // resto vermelho
  })

  return {
    labels,
    datasets: [
      {
        ...props.chartData.datasets[0],
        backgroundColor: colors,
      },
    ],
  }
})


// Reatividade das options
const reactiveChartOptions = reactive(props.chartOptions)

// Atualiza reativamente quando chartData mudar
watch(
  () => props.chartData,
  (newData) => {
    Object.assign(reactiveChartOptions, props.chartOptions)
  },
  { deep: true }
)
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-5 w-full h-[350px]">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Vendas por Categoria</h2>
    <Bar :data="reactiveChartData" :options="reactiveChartOptions" />
  </div>
</template>
