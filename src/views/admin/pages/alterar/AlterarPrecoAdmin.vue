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
            :categoryName="categoriaSelecionada.categoryName"
            :items="categoriaSelecionada.items"
            :id="slugify(categoriaSelecionada.categoryName)"
            :mostrarQuantidade="false"
            :mostrarPreco="true"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  NavLateralAdmin,
  TitleAdmin,
  CategoryCarrocelAdmin,
  CategoryBoxAdmin,
} from '@/components/index'
import { useUiStore, useProdutosStore } from '@/stores/index'

const ui = useUiStore()
const produtosStore = useProdutosStore()

const categoriaSelecionada = ref(null)

// Map das categorias (id ou nome que vem da API)
const categoriaMap = {
  1: 'Frangos',
  2: 'Maioneses',
  3: 'Costela Assada',
  4: 'Bebidas',
  5: 'Conservas',
  6: 'Farofas',
}

const categoriaOrdem = ['Frangos', 'Maioneses', 'Costela Assada', 'Bebidas', 'Conservas', 'Farofas']

// Computed: organiza os produtos por categoria
const categorias = computed(() => {
  const agrupados = {}
  for (const item of produtosStore.produtos) {
    const categoriaNome = categoriaMap[item.categoria]
    if (!categoriaNome) continue
    if (!agrupados[categoriaNome]) agrupados[categoriaNome] = []
    agrupados[categoriaNome].push(item)
  }

  return categoriaOrdem
    .filter(cat => agrupados[cat])
    .map(cat => ({
      categoryName: cat,
      items: agrupados[cat]
    }))
})


onMounted(async () => {
  ui.showLoading()
  try {
    await produtosStore.fetchProdutos()
  } finally {
    ui.hideLoading()
  }
})

const selecionarCategoria = (label) => {
  categoriaSelecionada.value = categorias.value.find(cat => cat.categoryName === label)
}

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
</script>
