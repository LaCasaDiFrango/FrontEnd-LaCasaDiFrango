// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import Toast from 'vue-toastification'; // ✅ IMPORTAÇÃO CORRETA
import 'vue-toastification/dist/index.css';
const app = createApp(App)

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
})



app.config.globalProperties.$axios = axios; // Agora todos os componentes usam this.$axios


app.use(createPinia());
app.use(router);
app.mount('#app');