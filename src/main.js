// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import '@passageidentity/passage-elements';

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";


async function bootstrap() {
  const app = createApp(App);
  app.config.globalProperties.$axios = axios;

  const pinia = createPinia();
  app.use(pinia);
  app.use(router);

  // 🔑 Importa a store e carrega usuário salvo no localStorage
  const { useAuthStore } = await import('@/stores/index');
  const authStore = useAuthStore();

  // Carrega usuário e token do localStorage
  await authStore.loadFromStorage();

  console.log('[DEBUG main.js] Usuário carregado:', authStore.user);
  console.log('[DEBUG main.js] isGuest:', authStore.isGuest.value);

  // Configuração global do Toast
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.TOP_RIGHT,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: false,
  hideProgressBar: true,
});

  app.mount('#app');

  // ✅ Escuta login do Passage e pega token
  const passage = document.querySelector('passage-auth');
  passage?.addEventListener('passage-auth-success', async () => {
    const token = await passage.getAuthToken();
    if (token) {
      authStore.setToken(token).catch(() => {
        authStore.unsetToken();
        localStorage.removeItem('psg_auth_token');
      });
      // Redireciona para /home após login
      router.push('/home');
    }
  });
}



bootstrap();

