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
  'src/assets/img/',
  'src/assets/img/',
  'src/assets/img/',
]

const options = {
  type: 'loop',
  autoplay: true,
  interval: 6000,
  pauseOnHover: true,
  arrows: false,
  pagination: true,
  gap: '1rem',
  heightRatio: 0.4,
}
</script>

<style scoped>
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
.splide{
  max-width: 90%;
  margin: 52px auto 0 auto; 
  border-radius: 12px;
  overflow: hidden;
}
</style>
