<template>
  <div class="form-page">
      <BackButton />

    
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
import {BackButton, ContinueButton, InputForm} from '@/components/index'

</script>

<style scoped>
.form-page {
  padding: 24px 16px 80px;
  min-height: 100vh;
  box-sizing: border-box;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  font-weight: 550;
}
</style>
