<template>
  <div class="register-page">
    <BackButton />
  <passage-auth app-id="WEG5lzsWo0bbZlaYwtVYYb6Q"></passage-auth>
<!--
<form class="form-content">
  <InputForm
    v-model="name"
    label="Digite seu Nome Completo"
    placeholder="Nome completo"
  />

  <InputForm
    v-model="email"
    label="Digite seu Email"
    placeholder="exemplo@gmail.com"
    type="email"
  />
  <InputForm
    v-model="password"
    label="Digite sua Senha"
    placeholder="Senha"
    type="password"
  />
</form>
-->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {BackButton, InputForm} from '@/components/index'
import '@passageidentity/passage-elements/passage-auth'

// const name = ref('')
// const email = ref('')
// const password = ref('')

// const handleSubmit = async () => {
//   try {
//     const payload = {
//       name: name.value,
//       email: email.value,
//       password: password.value
//     }

//     const response = await api.post('/usuarios/', payload)
//     console.log('Usuário cadastrado com sucesso:', response.data)
//     alert('Cadastro realizado!')
//   } catch (error) {
//     console.error('Erro ao cadastrar usuário:', error.response?.data || error.message)
//     alert('Erro ao cadastrar usuário.')
//   }
// }
</script>


<style scoped>
.register-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.form-content {
  padding: 1.5rem;
  flex-grow: 1;
  font-weight: 550;
}

.button-footer {
  position: sticky;
  bottom: 0;
  background-color: #1b3d1f;
  padding: 1rem;
}

.button-footer button {
  width: 100%;
}
</style>