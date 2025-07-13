<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>

<template>
  <div v-if="auth.isGuest">Você está usando como <strong>Convidado</strong></div>
  <div v-else-if="auth.isAdmin">Bem-vindo <strong>Administrador</strong></div>
  <div v-else-if="auth.isUser">Bem-vindo <strong>Usuário</strong></div>
</template>
