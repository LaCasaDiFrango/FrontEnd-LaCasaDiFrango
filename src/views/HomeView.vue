<script setup>
import {
  CategoryNav,
  BannerCarousel,
  FrangoCard,
  AlertaHorario,
  LocalizacaoMapa,
  ContatoRedes,
} from '@/components/index'
import WarningIcon from '@/assets/img/warning-sign.png'
import FileIcon from '@/assets/img/file.png'
</script>
<template>
  <div class="home-page">
    <CategoryNav />
    <BannerCarousel />

    <!-- Só chamamos o FrangoCard, que já lida com suas imagens e labels -->
    <FrangoCard />

    <AlertaHorario title="ATENÇÃO" :icon="WarningIcon">
      <p class="alert-text">Horário de Funcionamento: <strong>Quarta a Domingo</strong></p>
      <p class="alert-text">Retirada de Encomendas: <strong>9:00 a 12:30</strong></p>
    </AlertaHorario>
    <div class="buttonHistoria" @click="$router.push('/historia')">
      <AlertaHorario title="Nossa História" :icon="FileIcon">
        <p class="alert-text">Conheça nossa história de <strong>31 anos</strong> de</p>
        <p class="alert-text">comércio, nossa equipe e algumas lembranças.</p>
        <p class="button-text">Ver mais</p>
      </AlertaHorario>
    </div>

    <LocalizacaoMapa />
    <ContatoRedes
      :whatsapp="{ href: 'https://wa.me/5547999112233', text: '(47) 99991-12233' }"
      :instagram="{ href: 'https://instagram.com/minhaempresa', text: '@lacasadifrango' }"
    />
  </div>
</template>



<style scoped>
.home-page {
  padding-bottom: 80px;
}

.alert-text {
  font-size: 14px;
  color: #333;
  margin: 0;
}

.buttonHistoria {
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.1rem 0;
  border-radius: 4px;
  max-width: 90%;
  margin: auto;
  transition: all 0.3s ease;
}

.buttonHistoria:hover {
  background-color: #f9f9f9;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
.button-text {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: 14px;
  color: #1d4523;
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
}
</style>
