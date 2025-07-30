<script setup>
import { ref, onMounted } from 'vue'
import { useCardapioStore } from '@/stores'
import { NavBar, CardapioCategory, CardapioNavbar, TitlePages, SearchBar } from '@/components/index'

const cardapioStore = useCardapioStore()
const searchQuery = ref('')

onMounted(() => {
  cardapioStore.fetchProdutos()
})

// Você pode usar searchQuery para filtrar categorias ou itens, por exemplo
</script>

<template>
  <div class="cardapio-container">
    <TitlePages title="Cardápio" />

    <SearchBar
      v-model="searchQuery"
      placeholder="Procure em nosso cardápio"
    />

    <CardapioNavbar :categories="cardapioStore.categories" />

    <section class="cardapioMain">
      <CardapioCategory
        v-for="cat in cardapioStore.categories"
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
