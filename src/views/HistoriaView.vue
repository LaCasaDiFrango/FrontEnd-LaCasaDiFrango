<script setup>
import { HistoriaBanner, GaleriaCarousel, BackButton } from '@/components';

const inicioImages = [
  { src: '/src/assets/img/GaleriaFrango/referencia.jpg', alt: 'História 1' },
  { src: '/src/assets/img/GaleriaFrango/inauguração 2.jpg', alt: 'História 2' },
  { src: '/src/assets/img/GaleriaFrango/inauguração 3.jpg', alt: 'História 3' },
  { src: '/src/assets/img/GaleriaFrango/inauguração.jpg', alt: 'História 4' },
];

const primeirosAnosImages = [
  { src: '/src/assets/img/GaleriaFrango/frente muito mais velha.jpg', alt: 'História 5' },
  { src: '/src/assets/img/GaleriaFrango/maquinas.jpg', alt: 'História 6' },
  { src: '/src/assets/img/GaleriaFrango/primeiros dias.jpg', alt: 'História 7' },
  { src: '/src/assets/img/GaleriaFrango/frente velha.jpg', alt: 'História 8' },
];

const temposRecentesImages = [
  { src: '/src/assets/img/GaleriaFrango/frente media.jpg', alt: 'História 9' },
  { src: '/src/assets/img/GaleriaFrango/equipe.jpg', alt: 'História 10' },
  { src: '/src/assets/img/GaleriaFrango/equipe frente.jpg', alt: 'História 11' },
  
];
</script>

<template>
    <BackButton />
  <div class="historia-page">
    <HistoriaBanner />

    <div class="section-title">
      <hr class="line" />
      <h1>O Início</h1>
      <hr class="line" />
    </div>

    <!-- Carrossel com imagens do início -->
    <GaleriaCarousel :imagens="inicioImages" />

    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ducimus deleniti accusantium voluptate earum aspernatur illo unde eius amet, magni dolore nesciunt placeat quos blanditiis voluptas nostrum sed delectus porro.</p>

    <div class="section-title">
      <hr class="line" />
      <h1>Primeiros Anos</h1>
      <hr class="line" />
    </div>

    <!-- Carrossel com imagens dos primeiros anos -->
    <GaleriaCarousel :imagens="primeirosAnosImages" />

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequuntur commodi quos in optio fugit ex molestiae veniam rerum, harum odit facilis minus tempora? Tempora accusantium perferendis modi sunt praesentium.</p>

    <div class="section-title">
      <hr class="line" />
      <h1>Tempos Recentes</h1>
      <hr class="line" />
    </div>

    <GaleriaCarousel :imagens="temposRecentesImages" />

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum velit minus, ipsa consectetur repudiandae ipsum praesentium, at autem mollitia veniam reiciendis, facilis enim! Sed voluptate illum aperiam id iste eveniet!</p>
  </div>

  <img class="logo" src="/src/assets/img/logo.png" alt="">
</template>


<style scoped>


/* Seção de título estilizado */
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin: 20px 0;
}

.section-title h1 {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #154413; /* cor do site */
  margin: 0;
}

.section-title .line {
  flex: 1;
  height: 1px;
  background-color: #154413;
  opacity: 0.4;
}
p {
  text-align: justify;
  margin: 20px 15px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.logo {
  display: block;
  margin: 40px auto;
  width: 120px;
  height: auto;
}

/* Ajuste mobile */
@media (max-width: 480px) {
  .section-title h1 {
    font-size: 22px;
  }
}
</style>
