<script setup>
import { ref, reactive, toRefs, watch } from 'vue'
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

// Definindo props
const props = defineProps({
  chartData: {
    type: Object,
    default: () => ({
      labels: [
        'Frangos',
        'Maioneses',
        'Costelas',
        'Bebida',
        'Conservas',
        'Farofas',
      ],
      datasets: [
        {
          label: 'Vendas',
          data: [150, 120, 40, 80, 65, 50],
          backgroundColor: [
            '#1b3d1f',
            '#3b82f6',
            '#B91C1C',
            '#facc15',
            '#facc15',
            '#B91C1C',
          ],
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
          ticks: { color: '#4b5563', stepSize: 20 },
          beginAtZero: true,
          grace: '10%',
        },
      },
    }),
  },
})

// Transformando props em reactive para Chart.js
const reactiveChartData = reactive(props.chartData)
const reactiveChartOptions = reactive(props.chartOptions)

// Se você quiser atualizar os dados dinamicamente via prop
watch(
  () => props.chartData,
  (newData) => {
    Object.assign(reactiveChartData, newData)
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
