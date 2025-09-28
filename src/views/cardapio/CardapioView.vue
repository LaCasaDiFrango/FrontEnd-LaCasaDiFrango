<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCardapioStore } from '@/stores'
import { NavBar, CardapioCategory, CardapioNavbar, TitlePages, SearchBar } from '@/components/index'

const cardapioStore = useCardapioStore()
const searchQuery = ref('')

onMounted(() => {
  cardapioStore.fetchProdutos()
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
</script>

<template>
  <div class="cardapio-container">
    <TitlePages title="Cardápio" @click="$router.back()" />

    <SearchBar
      v-model="searchQuery"
      placeholder="Procure em nosso cardápio"
    />

    <section class="cardapioMain">
      <CardapioCategory
        v-for="cat in filteredCategories"
        :key="cat.categoryName"
        :categoryName="cat.categoryName"
        :items="cat.items"
      />
    </section>

    <NavBar />
  </div>
</template>

<style scoped>
.cardapio-container {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}
.cardapioMain {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>