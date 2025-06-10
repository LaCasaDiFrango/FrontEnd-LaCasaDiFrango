<template>
  <div class="register-page">
    <BackButton />

    <form class="form-content">
      <InputForm
       
        label="Digite seu Nome Completo"
        placeholder="Nome completo"
      />

      <InputForm
       
        label="Digite seu Telefone"
        placeholder="(00) 00000-0000"
        type="tel"
      />
    </form>
   <ContinueButton :onClick="handleSubmit" />
  </div>
</template>

<script setup>

import BackButton from '@/components/buttons/BackButton.vue'
import InputForm from '@/components/forms/InputForm.vue'
import ContinueButton from '@/components/buttons/ContinueButton.vue'




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
