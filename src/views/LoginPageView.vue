<template>
  <div class="register-page">
    <BackButton />

    <form class="form-content" @submit.prevent="handleSubmit">
      <InputForm
        v-model="fullName"
        label="Digite seu Nome Completo"
        placeholder="Nome completo"
      />

      <InputForm
        v-model="phone"
        label="Digite seu Telefone"
        placeholder="(00) 00000-0000"
        type="tel"
      />
    </form>
   <ContinueButton :onClick="handleSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BackButton from '@/components/BackButton.vue'
import InputForm from '@/components/InputForm.vue'
import ContinueButton from '@/components/ContinueButton.vue'

const fullName = ref('')
const phone = ref('')

function handleSubmit() {
  console.log('Nome:', fullName.value)
  console.log('Telefone:', phone.value)
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
