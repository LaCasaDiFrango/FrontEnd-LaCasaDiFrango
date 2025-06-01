<template>
  <div>
    <h2>Lista de Usuários</h2>
    <div v-if="debugInfo">
      <h3>Informações de Debug:</h3>
      <pre>{{ debugInfo }}</pre>
    </div>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.username }}
      </li>
    </ul>
    <p v-else-if="!loading && !error">Nenhum usuário encontrado</p>
    <p v-else-if="error" class="error">Erro: {{ error }}</p>
    <p v-else>Carregando usuários...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api'

const users = ref([])
const loading = ref(true)
const error = ref(null)
const debugInfo = ref(null)

onMounted(async () => {
  try {
    console.log('Iniciando requisição...')
    const response = await api.get('/usuarios/')
    console.log('Resposta completa:', response)
    
    debugInfo.value = {
      status: response.status,
      headers: response.headers,
      data: response.data,
      requestUrl: response.config.url
    }
    
    if (response.data && Array.isArray(response.data)) {
      users.value = response.data
    } else {
      error.value = 'A API não retornou um array de usuários'
      console.error('Formato inesperado:', response.data)
    }
  } catch (err) {
    console.error('Erro completo:', err)
    error.value = err.message
    
    if (err.response) {
      debugInfo.value = {
        status: err.response.status,
        data: err.response.data,
        headers: err.response.headers
      }
      error.value = `Erro ${err.response.status}: ${err.message}`
    }
  } finally {
    loading.value = false
  }
})
</script>
<style>

</style>