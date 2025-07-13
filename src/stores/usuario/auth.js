// stores/auth.js

import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '@/api/usuario/auth';

const authService = new AuthService();

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});
  const loggedIn = ref(false);

  // Login usando token (Passage ID)
  async function setToken(token) {
    const data = await authService.postUserToken(token);
    user.value = { ...data, perfil: data.perfil };
    loggedIn.value = true;
  }

  // Acesso como convidado
  function setGuest() {
    user.value = {
      nome: 'Convidado',
      email: '',
      perfil: 'convidado',
    };
    loggedIn.value = true;
    localStorage.setItem('user', JSON.stringify(user.value)); // salva no localStorage
  }

  // Logout
  function unsetToken() {
    user.value = {};
    loggedIn.value = false;
    localStorage.removeItem('user'); // limpa do localStorage
  }

  // Carrega o usuário salvo (usado no main.js)
  function loadFromStorage() {
    const data = localStorage.getItem('user');
    if (data) {
      user.value = JSON.parse(data);
      loggedIn.value = true;
    }
  }

  // Getters reativos para facilitar verificação de permissões
  const isGuest = computed(() => user.value.perfil === 'convidado');
  const isAdmin = computed(() => user.value.perfil === 'administrador');
  const isUser = computed(() => user.value.perfil === 'usuario');

  // Salva automaticamente o usuário no localStorage (exceto convidado)
  watch(user, (val) => {
    if (val && Object.keys(val).length && val.perfil !== 'convidado') {
      localStorage.setItem('user', JSON.stringify(val));
    }
  });

  return {
    user,
    loggedIn,
    setToken,
    setGuest,
    unsetToken,
    loadFromStorage,
    isGuest,
    isAdmin,
    isUser,
  };
});
