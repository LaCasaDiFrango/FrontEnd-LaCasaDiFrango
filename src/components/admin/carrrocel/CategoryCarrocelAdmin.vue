<template>
  <div class="carousel-container">
    <div class="carousel-wrapper" ref="carousel">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        @click="scrollToSection(item.targetId)"
      >
        <div class="img-wrapper">
          <img :src="item.img" :alt="item.label" />
        </div>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const carousel = ref(null)

const items = [
  { img: new URL('@/assets/img/chicken-leg.png', import.meta.url).href, label: 'Frangos', targetId: 'frangos' },
  { img: new URL('@/assets/img/mashed-potatoes.png', import.meta.url).href, label: 'Maioneses', targetId: 'maioneses' },
  { img: new URL('@/assets/img/ribs.png', import.meta.url).href, label: 'Costela', targetId: 'costela-assada' },
  { img: new URL('@/assets/img/soda.png', import.meta.url).href, label: 'Bebidas', targetId: 'bebidas' },
  { img: new URL('@/assets/img/zucchini.png', import.meta.url).href, label: 'Conservas', targetId: 'conservas' },
  { img: new URL('@/assets/img/migalhas.png', import.meta.url).href, label: 'Farofas', targetId: 'farofas' }
]

// Rola até a seção correspondente
const scrollToSection = (id) => {
  const section = document.getElementById(id)
  if (section) {
    const offset = 80 // altura do header fixo
    const top = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  padding: 10px 0;
}

.carousel-wrapper {
  display: flex;
  justify-content: space-evenly; /* centraliza quando couber tudo */
  flex-wrap: wrap; /* quebra linha se precisar */
  gap: 16px;
  scroll-behavior: smooth;
}

/* Itens */
.carousel-item {
  flex: 0 1 auto;
  text-align: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.carousel-item:hover {
  transform: scale(1.01) translateY(-3px);
  opacity: 0.9;
}

/* Imagem */
.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.carousel-item img {
  width: 80px;
  height: auto;
  object-fit: cover;
  padding: 12px;
  border-radius: 12px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.carousel-item span {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 🔹 Quando a tela for menor, ativa o carrossel horizontal */
@media (max-width: 768px) {
  .carousel-wrapper {
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    justify-content: flex-start;
    scrollbar-width: none;
  }

  .carousel-wrapper::-webkit-scrollbar {
    display: none;
  }

  .carousel-item {
    flex: 0 0 calc(33.333% - 10px); /* mostra 3 por vez no mobile */
    scroll-snap-align: start;
  }
}
</style>
