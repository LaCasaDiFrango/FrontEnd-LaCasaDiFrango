<script setup>
import { AuthButton } from '@/components/index'
import { useAuthStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function entrarComoConvidado() {
  auth.setGuest()
  router.push('/home') // ou outra rota pública
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <router-link to="/signup">
        <AuthButton filled>Fazer Login</AuthButton>
      </router-link>

      <router-link to="/signup">
        <div class="spacer" />
        <AuthButton>Criar Conta</AuthButton>
      </router-link>

      <!-- Entrar como convidado -->
      <div class="guest-link" @click="entrarComoConvidado">Entrar como convidado</div>

      <img src="@/assets/img/logo.png" alt="Logo" class="logo" />
    </div>
  </div>
  <RouterView />
</template>


<style scoped>
.login-page {
  min-height: 100dvh;
  background-color: #e5e5e5; /* cinza claro */
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
</style>
