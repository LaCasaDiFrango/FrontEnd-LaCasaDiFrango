// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios'; // Importe o Axios diretamente
// OU use sua instância personalizada:
// import api from '@/plugins/axios';

const app = createApp(App);

// Opção 1: Injetar o Axios diretamente (globalmente)
app.config.globalProperties.$axios = axios; // Agora todos os componentes usam this.$axios

// Opção 2: Injetar sua instância personalizada (recomendado)
// app.config.globalProperties.$api = api;

app.use(createPinia());
app.use(router);
app.mount('#app');