<script setup>
import CategoryNav from '@/components/layout/CategoryNav.vue';
import BannerCarousel from '@/components/layout/BannerCarousel.vue';
import FrangoCard from '@/components/cards/FrangoCard.vue';
import AlertaHorario from '@/components/cards/AlertaHorario.vue';


const frangos = [
  {
    label: 'Recheado R$65,00.',
    icon: 'src/assets/img/chicken-leg.png',
  },
  {
    label: 'Sem Recheio R$55,00.',
    icon: 'src/assets/img/chicken-leg.png',
  },
]
</script>

<template>
  <div class="home-page">

    <CategoryNav />
    <BannerCarousel/>
     <div class="frango-cards-container">
    <FrangoCard
      v-for="(frango, index) in frangos"
      :key="index"
      :label="frango.label"
      :icon="frango.icon"
    />
  </div>
    <AlertaHorario />
    

   
  </div>
</template>
<style scoped>
.frango-cards-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 24px 0;
}
</style>
