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
  { img: '/src/assets/img/chicken-leg.png', label: 'Frangos', targetId: 'frangos' },
  { img: '/src/assets/img/mashed-potatoes.png', label: 'Maioneses', targetId: 'maioneses' },
  { img: '/src/assets/img/ribs.png', label: 'Costela', targetId: 'costela-assada' },
  { img: '/src/assets/img/soda.png', label: 'Bebidas', targetId: 'bebidas' },
  { img: '/src/assets/img/zucchini.png', label: 'Conservas', targetId: 'conservas' },
  { img: '/src/assets/img/migalhas.png', label: 'Farofas', targetId: 'farofas' }
]


// 🔹 Rolar até a seção correspondente na página
const scrollToSection = (id) => {
  const section = document.getElementById(id)
  if (section) {
    const offset = 80 // altura do header fixo (ajuste conforme seu layout)
    const top = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
}

.carousel-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 16px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.carousel-wrapper::-webkit-scrollbar {
  display: none;
}


.carousel-item {
  flex: 0 0 calc(25% - 16px); /* mostra 3 por vez */
  scroll-snap-align: start;
  text-align: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.carousel-item:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* Wrapper da imagem */
.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.carousel-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #f0f0f0;
  padding: 7px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Texto abaixo da imagem */
.carousel-item span {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
</style>
