<template>
  <div class="form-page">
    <!-- Botão Voltar -->
    <div class="back-button-wrapper">
      <BackButton />
    </div>

    <!-- Campos -->
    <form class="form">
      <InputForm label="Digite seu Nome Completo" v-model="form.nome" />
      <InputForm label="Digite seu Telefone" v-model="form.telefone" />
      <InputForm label="Digite seu Endereço" v-model="form.endereco" />
      <InputForm label="Número" v-model="form.numero" />
      <InputForm label="Complemento (opcional)" v-model="form.complemento" />
    </form>

    <!-- Botão Continuar -->
    <ContinueButton @click="enviarFormulario" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import BackButton from '@/components/buttons/BackButton.vue'
import InputForm from '@/components/forms/InputForm.vue'
import ContinueButton from '@/components/buttons/ContinueButton.vue'

const form = reactive({
  nome: '',
  telefone: '',
  endereco: '',
  numero: '',
  complemento: '',
})

function enviarFormulario() {
  console.log('Dados enviados:', form)
  // Aqui você pode fazer a navegação ou enviar dados para a API
}
</script>

<style scoped>
.form-page {
  padding: 24px 16px 80px; /* espaço extra no final por causa do botão fixo */
  min-height: 100vh;
  box-sizing: border-box;
}

.back-button-wrapper {
  display: flex;
  justify-content: flex-start;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}
</style>
