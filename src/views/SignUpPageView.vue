<template>
  <div class="register-page">
    <BackButton />

    <form class="form-content">
      <InputForm
        v-model="nome"
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
   <ContinueButton :onClick="handleSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/buttons/BackButton.vue'
import InputForm from '@/components/forms/InputForm.vue'
import ContinueButton from '@/components/buttons/ContinueButton.vue'
import api from '@/api/api'
import { useToast } from 'vue-toastification';

const toast = useToast();

const nome = ref('')
const email = ref('')
const password = ref('')

const mostrarSucesso = () => {
  toast.success("Cadastro realizado!", {
    position: "top-center",
    timeout: 2032,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false
  });
};

const mostrarErro = () => {
  toast.error("Erro ao cadastrar usuário.", {
    position: "top-center",
    timeout: 2032,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false
  })
}

const handleSubmit = async () => {
  try {
    const payload = {
      nome: nome.value,
      email: email.value,
      password: password.value
    }

    const response = await api.post('/usuarios/', payload)
    console.log('Usuário cadastrado com sucesso:', response.data)
    mostrarSucesso()
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.response?.data || error.message)
    mostrarErro()
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
