<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Navigation, Zoom } from 'swiper/modules';

// Recebe as imagens via prop
defineProps({
  imagens: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <Swiper
    :modules="[Navigation, Zoom]"
    navigation
    zoom
    class="galeria-carousel"
  >
    <SwiperSlide v-for="(img, index) in imagens" :key="index">
      <div class="swiper-zoom-container">
        <img :src="img.src" :alt="img.alt" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.galeria-carousel {
  width: 100%;
  max-width: 400px;
  height: 300px;
  margin: 20px auto 0;
  overflow: hidden;
}

.galeria-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.galeria-carousel ::v-deep(.swiper-button-next),
.galeria-carousel ::v-deep(.swiper-button-prev) {
  color: #154413;
  width: auto;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
}

.galeria-carousel ::v-deep(.swiper-button-next::after),
.galeria-carousel ::v-deep(.swiper-button-prev::after) {
  font-size: 24px;
}

@media (max-width: 480px) {
  .galeria-carousel {
    height: 200px;
  }
}
</style>
