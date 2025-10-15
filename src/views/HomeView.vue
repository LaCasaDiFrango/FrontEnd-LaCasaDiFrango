<script setup>
import { ref, computed, nextTick } from 'vue'
import { useAuthStore } from '@/stores/usuario/auth'

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

const auth = useAuthStore()

// Estado do banner
const showCompleteProfileBanner = ref(false)

// Computed para verificar se o usuário precisa completar cadastro
const needsProfile = computed(() => {
  return auth.loggedIn && (!auth.user.name || auth.user.name.trim() === '')
})

// Mostra o banner com animação quando a página carrega
if (needsProfile.value) {
  nextTick(() => {
    showCompleteProfileBanner.value = true
  })
}

// Navegar para página de atualizar usuário
const goToProfile = () => {
  window.location.href = '/home/perfil/editar'
}

// Fechar banner
const closeBanner = () => {
  showCompleteProfileBanner.value = false
}
</script>

<template>
  <div class="home-page">
    <!-- Banner estilo toast -->
    <transition name="slide-right">
      <div v-if="showCompleteProfileBanner" class="complete-profile-toast">
        <span>Seja Bem Vindo !</span>
        <div class="banner-buttons">
          <button class="go-profile-btn" @click="goToProfile">Completar Cadastro</button>
          <button class="close-btn" @click="closeBanner">✖</button>
        </div>
      </div>
    </transition>

    <CategoryNav />
    <BannerCarousel />

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
      :whatsapp="{ href: 'https://wa.me/5547999942292', text: '(47) 99994-2292' }"
      :instagram="{ href: 'https://instagram.com/lacasadifrangojoinville', text: '@lacasadifrangojoinville' }"
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

/* Banner toast topo */
.complete-profile-toast {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #2196F3; 
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  z-index: 2000;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* Botões dentro do banner */
.banner-buttons {
  display: flex;
  gap: 10px;
}

.go-profile-btn {
  background-color: white;
  color: #2196F3;
  font-weight: 600;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.go-profile-btn:hover {
  background-color: #e6e6e6;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* Animação entrada da direita */
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-enter-active {
  transition: transform 0.4s ease;
}
.slide-right-enter-to {
  transform: translateX(0);
}

.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-active {
  transition: transform 0.4s ease;
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
