<script setup>
import AuthButton from '../components/AuthButton.vue'
import BackButton from '../components/BackButton.vue'
</script>
<template>
  <div class="login-page">
    <BackButton />

    <div class="login-card">
      <router-link to="/login">
      <AuthButton filled>Fazer Login</AuthButton>
      </router-link>
      <div class="spacer" />
      <AuthButton>Criar Conta</AuthButton>

      <img src="../assets/img/logo.png" alt="Logo" class="logo" />

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
  height: 80px; /* 48px */
  width: 130px; /* 48px */
  margin: 1rem auto 0;
  display: block;
}
</style>
