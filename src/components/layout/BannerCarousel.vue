<!-- src/components/BannerCarousel.vue -->
<template>
  <Splide :options="options" aria-label="Banner Carousel">
    <SplideSlide v-for="(banner, index) in banners" :key="index">
      <img :src="banner" class="banner-image" />
    </SplideSlide>
  </Splide>
</template>

<script setup>
import '@splidejs/splide/dist/css/splide.min.css'
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const banners = [
  new URL('@/assets/img/bannermaionese.png', import.meta.url).href,
  new URL('@/assets/img/bannerFrango.png', import.meta.url).href,
  new URL('@/assets/img/bannercostela.png', import.meta.url).href,
 
]

const options = {
  type: 'loop',
  autoplay: true,
  interval: 6000,
  pauseOnHover: true,
  arrows: false,
  pagination: true,
  gap: '1rem',
  
}
</script>

<style scoped>
.splide {
  max-width: 98%;        /* ocupa quase toda a largura */
  margin: 32px auto;      /* centraliza */
  border-radius: 12px;
  overflow: hidden;

}

.banner-image {
  width: 90%;             /* imagem ocupa 90% da largura */
  height: auto;           /* mantém proporção */
  object-fit: contain;    /* mostra a imagem inteira */
  display: block;
  margin: 0 auto;
  border-radius: 12px;
}
</style>
