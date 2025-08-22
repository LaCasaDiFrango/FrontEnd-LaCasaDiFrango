// stores/auth.js

import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '@/api/index'

import AuthService from '@/api/usuario/auth';

const authService = new AuthService(); 

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});
  const loggedIn = ref(false);

  // Login usando token (Passage ID)
async function setToken(token) {
  localStorage.setItem('psg_auth_token', token);

  try {
    const data = await authService.postUserToken();
    console.log('[DEBUG setToken retorno API]:', data) // <-- Adicionar isso
    user.value = { ...data, perfil: data.perfil };
    loggedIn.value = true;
    console.log('[DEBUG] setToken - usuário logado:', user.value);
  } catch (error) {
    console.error('[ERROR] setToken failed:', error);
    unsetToken();
    throw error;  // opcional, para tratamento acima
  }
}

  // Acesso como convidado
function setGuest() {
  user.value = {
    nome: 'Convidado',
    email: '',
    perfil: 'convidado',
  };
  loggedIn.value = true;
  localStorage.removeItem('psg_auth_token');
  localStorage.removeItem('user');  // Limpa user no localStorage para evitar confusão
}



  // Logout
  function unsetToken() {
    user.value = {};
    loggedIn.value = false;
    localStorage.removeItem('user'); // limpa do localStorage
  }

  // Carrega o usuário salvo (usado no main.js)
async function loadFromStorage() {
  const data = localStorage.getItem('user');
  if (data) {
    user.value = JSON.parse(data);
    loggedIn.value = true;
  }

  const token = localStorage.getItem('psg_auth_token');
  if (token) {
    try {
      await setToken(token); // sempre tenta atualizar
    } catch (e) {
      console.log('[DEBUG] Falha ao atualizar usuário com token, limpando token');
      unsetToken();
      localStorage.removeItem('psg_auth_token');
    }
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
