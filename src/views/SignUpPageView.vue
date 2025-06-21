<template>
  <div class="register-page">
    <BackButton />

    <!-- Widget do Passage para login/signup -->
    <passage-login
      app-id="WEG5lzsWo0bbZlaYwtVYYb6Q"
      @login="onPassageLogin"
    ></passage-login>

    <form class="form-content" @submit.prevent="handleSubmit">
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

      <ContinueButton type="submit" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/buttons/BackButton.vue'
import InputForm from '@/components/forms/InputForm.vue'
import ContinueButton from '@/components/buttons/ContinueButton.vue'
import api from '@/api/api'
import '@passageidentity/passage-elements' // importa os web components Passage

const name = ref('')
const email = ref('')
const password = ref('')
const passageId = ref('')

// Captura o passage_id emitido pelo componente passage-login
function onPassageLogin(event) {
  // event.detail.userId é o passage_id
  passageId.value = event.detail?.userId || ''
  console.log('Passage ID capturado:', passageId.value)
}

const handleSubmit = async () => {
  if (!passageId.value) {
    alert('Você precisa se autenticar via Passage primeiro.')
    return
  }

  try {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      passage_id: passageId.value,
    }

    const response = await api.post('/usuarios/', payload)
    alert('Cadastro realizado com sucesso!')
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.response?.data || error.message)
    alert('Erro ao cadastrar usuário.')
  }
}
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
