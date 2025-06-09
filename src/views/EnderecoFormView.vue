<template>
  <div class="form-page">
    
    <div class="back-button-wrapper">
      <BackButton />
    </div>

    
    <form class="form">
      <InputForm label="Bairro" />
      <InputForm label="Rua" />
      <InputForm label="Cep" />
      <InputForm label="Número" />
      <InputForm label="Complemento"  />
    </form>


    <ContinueButton  />
  </div>
</template>

<script setup>
import BackButton from '@/components/buttons/BackButton.vue'
import InputForm from '@/components/forms/InputForm.vue'
import ContinueButton from '@/components/buttons/ContinueButton.vue'

</script>

<style scoped>
.form-page {
  padding: 24px 16px 80px;
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
  font-weight: 550;
}
</style>
