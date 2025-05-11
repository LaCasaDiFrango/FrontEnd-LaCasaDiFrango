// src/plugins/axios.js
import axios from 'axios';

// Cria uma instância personalizada do Axios
const api = axios.create({
  baseURL: 'https://sua-api-aqui.com', // Substitua pela URL base da sua API
  timeout: 5000, // Tempo máximo de espera (opcional)
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers globais (ex: token)
  },
});

export default api;