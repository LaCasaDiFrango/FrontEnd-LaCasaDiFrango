<script setup>
import { CategoryNav, BannerCarousel, FrangoCard, AlertaHorario, HistoriaCard, LocalizacaoMapa, ContatoRedes } from '@/components/index';

const frangos = [
  {
    label: 'Recheado R$65,00.',
    icon: '/src/assets/img/chicken-leg.png',
  },
  {
    label: 'Sem Recheio R$55,00.',
    icon: '/src/assets/img/chicken-leg.png',
  },
]
</script>

<template>
  <div class="home-page">

    <CategoryNav />
    <BannerCarousel />
    <div class="frango-cards-container">
      <FrangoCard v-for="(frango, index) in frangos" :key="index" :label="frango.label" :icon="frango.icon" />
    </div>
    <AlertaHorario title="ATENÇÃO" icon="/src/assets/img/warning-sign.png">
      <p class="alert-text">
        Horário de Funcionamento: <strong>Quarta a Domingo</strong>
      </p>
      <p class="alert-text">
        Retirada de Encomendas: <strong>9:00 a 12:30</strong>
      </p>
    </AlertaHorario>
    <AlertaHorario title="Nossa História" icon="/src/assets/img/file.png">
      <p class="alert-text">
        Conheça nossa história de <strong>31 anos</strong> de
      </p>
      <p class="alert-text">
        comércio, nossa equipe e algumas lembranças.
      </p>
      <router-link to="/historia" class="historia-link">
        <button class="historia-button">

          <span>Ver História</span>


        </button>
      </router-link>
    </AlertaHorario>
    <LocalizacaoMapa />
    <ContatoRedes :whatsapp="{ href: 'https://wa.me/5547999112233', text: '(47) 99991-12233' }"
      :instagram="{ href: 'https://instagram.com/minhaempresa', text: '@lacasadifrango' }" />



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
.historia-button {
  margin-top: 15px;
  position: relative;
  display: inline-block;
  padding: 10px 25px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #004d40, #00695c, #1b5e20);
  background-size: 300% 300%;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  animation: gradientMove 5s ease infinite;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  overflow: hidden;
}
</style>
