// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import '@passageidentity/passage-elements';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');

// 🔑 Importa a store e carrega usuário salvo no localStorage
import { useAuthStore } from '@/stores/index';

const authStore = useAuthStore();
authStore.loadFromStorage();

// ✅ Escuta login do Passage e pega token
const passage = document.querySelector('passage-auth');

passage?.addEventListener('passage-auth-success', async () => {
  const token = await passage.getAuthToken();
  if (token) {
    authStore.setToken(token).catch(() => {
      authStore.unsetToken();
      localStorage.removeItem('psg_auth_token');
    });
  }
});
