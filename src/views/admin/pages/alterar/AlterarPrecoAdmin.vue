
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
          <CategoryCarrocelAdmin />
                <CategoryBoxAdmin
        v-for="cat in filteredCategories"
        :key="cat.categoryName"
        :categoryName="cat.categoryName"
        :items="cat.items"
        :id="slugify(cat.categoryName)" 
      />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { NavLateralAdmin, TitleAdmin, CategoryCarrocelAdmin, CategoryBoxAdmin } from '@/components/index'
import { useCardapioStore, useUiStore } from '@/stores'

const cardapioStore = useCardapioStore()
const ui = useUiStore()  // 👈 aqui
const searchQuery = ref('')

onMounted(async () => {
  ui.showLoading() // ativa o loading
  try {
    await cardapioStore.fetchProdutos()
  } finally {
    ui.hideLoading() // desativa o loading
  }
})

const filteredCategories = computed(() => {
  if (!cardapioStore.categories) return []

  if (!searchQuery.value) return cardapioStore.categories

  return cardapioStore.categories
    .map(cat => {
      const filteredItems = cat.items.filter(item =>
        item.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      return { ...cat, items: filteredItems }
    })
    .filter(cat => cat.items.length > 0)
})

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')

</script>
