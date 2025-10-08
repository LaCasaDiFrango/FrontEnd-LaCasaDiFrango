<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCardapioStore, useUiStore } from '@/stores'
import { NavBar, CardapioCategory, TitlePages, SearchBar, LoadingPage, CardapioNavbar } from '@/components/index'

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

<template>
  <!-- Loading global -->
  <div v-if="ui.loading">
    <LoadingPage />
  </div>

  <div v-else class="cardapio-container">
    <TitlePages title="Cardápio" @click="$router.back()" />

    <SearchBar
      v-model="searchQuery"
      placeholder="Procure em nosso cardápio"
    />

    <CardapioNavbar />

    <section class="cardapioMain">
      <CardapioCategory
        v-for="cat in filteredCategories"
        :key="cat.categoryName"
        :categoryName="cat.categoryName"
        :items="cat.items"
        :id="slugify(cat.categoryName)" 
      />
    </section>

    <NavBar />
  </div>
</template>

<style scoped>
.cardapio-container {
  padding: 50px 30px 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  justify-content: center;
}
.cardapioMain {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>