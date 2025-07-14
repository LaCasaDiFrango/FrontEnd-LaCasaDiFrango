<script setup>
import { onMounted, ref } from 'vue';
import { BackButton, NavBar, CardapioCategory, CardapioNavbar } from '@/components/index';
import imgFrango from '@/assets/img/chicken-leg.png';
import { produto } from '@/api/index';

const produtoService = new produto.default();
const categories = ref([]);

const categoriaMap = {
  1: 'Bebidas',
  2: 'Maionese',
  3: 'Frango',
};

onMounted(async () => {
  try {
    const response = await produtoService.getAll();
    const produtos = response.results; // <- aqui está o array correto

    const agrupados = {};

    for (const item of produtos) {
      const categoriaNome = categoriaMap[item.categoria];
      if (!categoriaNome) continue;

      if (!agrupados[categoriaNome]) {
        agrupados[categoriaNome] = [];
      }

      agrupados[categoriaNome].push({
        title: item.nome,
        price: `R$ ${parseFloat(item.preco).toFixed(2)}`,
        imgSrc: imgFrango,
        imgAlt: item.nome,
      });
    }

    categories.value = Object.entries(agrupados).map(([categoryName, items]) => ({
      categoryName,
      items,
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
});

</script>


<template>
  <div class="cardapio-container">
    <BackButton />
    <h2>Cardápio</h2>

    <div class="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon-lupa"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span>Procure em nosso cardápio</span>
    </div>

    <CardapioNavbar :categories="categories" />

    <section class="cardapioMain">
      <CardapioCategory
        v-for="cat in categories"
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
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #555;
  cursor: text;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 10px 30px;
}
.icon-lupa {
  color: #888;
}
.cardapioMain {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
