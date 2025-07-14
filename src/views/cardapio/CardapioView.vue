<script setup>
import { BackButton, NavBar, CardapioCategory, CardapioNavbar } from '@/components/index'
import imgFrango from '@/assets/img/chicken-leg.png'

const categories = [
  {
    categoryName: 'Frango',
    items: [
      {
        title: 'Frango Assado',
        price: 'R$ 29,90',
        imgSrc: imgFrango,
        imgAlt: 'Frango Assado',
      },
      {
        title: 'Frango Assado',
        price: 'R$ 29,90',
        imgSrc: imgFrango,
        imgAlt: 'Frango Assado',
      },
    ],
  },
  {
    categoryName: 'Bebidas',
    items: [
      {
        title: 'Refrigerante',
        price: 'R$ 7,00',
        imgSrc: imgFrango,
        imgAlt: 'Refrigerante',
      },
      {
        title: 'Suco Natural',
        price: 'R$ 9,00',
        imgSrc: imgFrango,
        imgAlt: 'Suco Natural',
      },
    ],
  },
  {
    categoryName: 'Maionese',
    items: [
      {
        title: 'Maionese Caseira',
        price: 'R$ 10,00',
        imgSrc: imgFrango,
        imgAlt: 'Maionese Caseira',
      },
      {
        title: 'Maionese Verde',
        price: 'R$ 12,00',
        imgSrc: imgFrango,
        imgAlt: 'Maionese Verde',
      },
    ],
  },
]
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
  cursor: text; /* Para parecer que pode digitar */
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