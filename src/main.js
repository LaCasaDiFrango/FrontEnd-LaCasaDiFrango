// src/main.js
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios'; 
const app = createApp(App);



app.config.globalProperties.$axios = axios; // Agora todos os componentes usam this.$axios


app.use(createPinia());
app.use(router);
app.mount('#app');