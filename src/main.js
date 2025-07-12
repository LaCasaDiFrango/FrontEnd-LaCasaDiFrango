// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios'; 
import '@passageidentity/passage-elements'

const app = createApp(App);

app.config.globalProperties.$axios = axios; // Agora todos os componentes usam this.$axios

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');

// Depois que o app estiver montado, tenta carregar usuário do token salvo
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const token = localStorage.getItem('psg_auth_token');
if (token) {
  authStore.setToken(token).catch(() => {
    authStore.unsetToken();
    localStorage.removeItem('psg_auth_token');
  });
}
