<script setup>
import {CategoryNav, BannerCarousel, FrangoCard, AlertaHorario, HistoriaCard, LocalizacaoMapa, ContatoRedes} from '@/components/index';

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
   <AlertaHorario title="ATENÇÃO" icon="/src/assets/img/warning-sign.png">
    <p class="alert-text">
      Horário de Funcionamento: <strong>Quarta a Domingo</strong>
    </p>
    <p class="alert-text">
      Retirada de Encomendas: <strong>9:00 a 12:30</strong>
    </p>
  </AlertaHorario>
    <HistoriaCard/>
    <LocalizacaoMapa />
    <ContatoRedes />
    

   
  </div>
</template>
<style scoped>
.frango-cards-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 24px 0;
}
.home-page {
  padding-bottom: 80px; 
}
.alert-text {
  font-size: 14px;
  color: #333;
  margin: 0;
}
</style>
