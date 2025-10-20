<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Estoque > Alterar Preço"
        subtitle="Alterar as informações de um produto no estoque"
      />

      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] flex-col gap-6 justify-between items-center">
          <!-- Carrossel -->
          <CategoryCarrocelAdmin @categoria-selecionada="selecionarCategoria" />

          <!-- Conteúdo Dinâmico -->
          <div v-if="!categoriaSelecionada" class="text-center text-gray-500 mt-6">
            Clique em uma categoria para alterar o preço de um produto.
          </div>

          <CategoryBoxAdmin
            v-else
            :key="categoriaSelecionada.categoryName"
            :categoryName="categoriaSelecionada.categoryName"
            :items="categoriaSelecionada.items"
            :id="slugify(categoriaSelecionada.categoryName)"
            :mostrarQuantidade="false"
            :mostrarPreco="true"
            tipo="estoque"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue' // 1. IMPORTE 'watch'

import {
  NavLateralAdmin,
  TitleAdmin,
  CategoryCarrocelAdmin,
  CategoryBoxAdmin,
} from '@/components/index'
import { useUiStore, useProdutosStore } from '@/stores/index'
import { storeToRefs } from 'pinia' // 1. IMPORTE storeToRefs
import imgFrango from '@/assets/img/chicken-leg.png' // 1. IMPORTE A IMAGEM PADRÃO

const ui = useUiStore()
const produtosStore = useProdutosStore()
const categoriaSelecionada = ref(null)
const { produtos } = storeToRefs(produtosStore)

const categoriasProcessadas = ref([])

// 2. DEFINA O BASE_URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const categoriaMap = {
  1: 'Frangos',
  2: 'Maioneses',
  3: 'Costela Assada',
  4: 'Bebidas',
  5: 'Conservas',
  6: 'Farofas',
}

const categoriaOrdem = ['Frangos', 'Maioneses', 'Costela Assada', 'Bebidas', 'Conservas', 'Farofas']

// 3. APLIQUE A LÓGICA DE TRANSFORMAÇÃO AQUI
watch(produtos, (novosProdutos ) => {
  console.log('[WATCH no Pai] O array de produtos do store mudou! Recalculando categorias...');

  const agrupados = {};
  for (const produto of novosProdutos) { 
    const categoriaNome = categoriaMap[produto.categoria]
    if (!categoriaNome) continue
    if (!agrupados[categoriaNome]) agrupados[categoriaNome] = []

    agrupados[categoriaNome].push({
      ...produto,
      preco: parseFloat(produto.preco).toFixed(2).replace('.', ','),
      image: produto.imagem
        ? (produto.imagem.startsWith('http' ) ? produto.imagem : `${BASE_URL}${produto.imagem}`)
        : imgFrango,
    })
  }

  // Atualize a nossa ref local com os dados processados
  categoriasProcessadas.value = categoriaOrdem
    .filter(cat => agrupados[cat])
    .map(cat => ({
      categoryName: cat,
      items: agrupados[cat]
    }))
}, { deep: true }) // O 'deep: true' é crucial aqui!

// ... resto do seu script setup ...
onMounted(async () => {
  ui.showLoading()
  try {
    await produtosStore.fetchProdutos()
  } finally {
    ui.hideLoading()
  }
})

const selecionarCategoria = (label) => {
  // Use a ref local 'categoriasProcessadas' em vez da computed
  categoriaSelecionada.value = categoriasProcessadas.value.find((cat) => cat.categoryName === label)
}

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
</script>
