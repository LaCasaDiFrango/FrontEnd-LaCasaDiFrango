<script setup>
import { AuthButton } from '@/components/index'
import { useAuthStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function entrarComoConvidado() {
  auth.setGuest()
  router.push('/dashboard')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">

      <!-- LOGO PRINCIPAL -->
      <img src="@/assets/img/logo.png" alt="Logo" class="logo main-logo" />

      <!-- TEXTOS DESKTOP -->
      <div class="desktop-elements">
        <h1 class="desktop-title">Bem-vindo ao Sistema Administrativo
        </h1>
        <p class="desktop-subtitle">Gerencie seu negócio de forma simples e intuitiva</p>
      </div>

      <!-- ====== MOBILE BUTTONS ====== -->
      <div class="mobile-buttons">
        <router-link to="/signup">
          <AuthButton filled class="login-btn">Fazer Login</AuthButton>
        </router-link>

        <router-link to="/signup">
          <div class="spacer" />
          <AuthButton class="login-btn">Criar Conta</AuthButton>
        </router-link>

        <div class="guest-link mobile-only" @click="entrarComoConvidado">
          Entrar como convidado
        </div>
      </div>

      <!-- ====== DESKTOP BUTTONS EMPILHADOS ====== -->
      <div class="desktop-buttons-stack">
        <router-link to="/signup" class="full-btn">
          <AuthButton filled class="login-btn-desktop">Fazer Login</AuthButton>
        </router-link>

        <router-link to="/signup" class="full-btn">
          <AuthButton class="login-btn-desktop bordered">Criar Conta</AuthButton>
        </router-link>
      </div>

      <!-- ====== LINK PARA DASHBOARD ====== -->
      <router-link to="/dashboard" class="dashboard-link-desktop">
        Ir para o Dashboard →
      </router-link>

    </div>
  </div>

  <RouterView />
</template>

<style scoped>
/* =========================================
   MOBILE (NÃO ALTERADO)
========================================= */
.login-page {
  min-height: 100dvh;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/img/bannerimg.png');
  background-size: cover;
  background-position: center;
}

.login-card {
  margin-top: auto;
  background-color: white;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  padding: 1.5rem;
}

.spacer {
  height: 0.9rem;
}

.logo {
  height: 80px;
  width: 130px;
  margin: 1rem auto 0;
  display: block;
}

.guest-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 14px;
  color: #214225;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
}

.mobile-only {
  display: block;
}

/* Desktop inicialmente escondido */
.desktop-elements,
.desktop-buttons-stack,
.dashboard-link-desktop {
  display: none;
}

/* =========================================
   DESKTOP (≥ 1024px)
========================================= */
@media (min-width: 1024px) {

  .mobile-only,
  .mobile-buttons {
    display: none;
  }

  .login-page {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  }

  .login-page::before {
    content: '';
    width: 50%;
    height: 100%;
    background-image: url('@/assets/img/bannerimg.png');
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    filter: brightness(0.9);
  }

  /* CENTRALIZAÇÃO VERTICAL */
  .login-card {
    width: 50%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    padding: 4rem 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-shadow: 0 25px 60px rgba(0,0,0,0.25);
  }

  /* Logo maior + animação */
  .main-logo {
    height: 150px;
    width: auto;
    margin-bottom: 2rem;
    animation: floatLogo 4s ease-in-out infinite;
  }

  @keyframes floatLogo {
    0% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0); }
  }

  /* ===== ANIMAÇÃO DO TEXTO NO DESKTOP ===== */
  .desktop-elements {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    animation: desktopTextAppear 0.9s ease-out forwards;
    opacity: 0;
  }

  @keyframes desktopTextAppear {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .desktop-title {
    font-size: 2rem;
    font-weight: 700;
    color: #103418;
    margin-bottom: 0.3rem;
    text-align: center;
  }

  .desktop-subtitle {
    font-size: 1rem;
    color: #406f48;
    margin-bottom: 2rem;
    text-align: center;
  }

  /* BOTÕES EMPILHADOS */
  .desktop-buttons-stack {
    display: flex;
    flex-direction: column;
    width: 70%;
    gap: 1rem;
    margin-top: 1rem;
  }

  .login-btn-desktop {
    width: 100%;
    padding: 1rem 0;
    font-size: 1rem;
    border-radius: 0.9rem;
  }

  .login-btn-desktop.bordered {
    border: 2px solid #214225;
    background: transparent;
    color: #214225;
  }

  /* LINK PARA DASHBOARD */
  .dashboard-link-desktop {
    display: block;
    margin-top: 3.5rem;
    font-size: 1rem;
    color: #214225;
    text-decoration: underline;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .dashboard-link-desktop:hover {
    opacity: 0.7;
  }
}
</style>
