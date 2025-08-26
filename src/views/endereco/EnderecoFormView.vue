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


    <AddPedidoButton label="Continuar"  />
  </div>
</template>

<script setup>
import {BackButton, AddPedidoButton, InputForm} from '@/components/index'

</script>

<style scoped>
.form-page {
  min-height: 100vh;
  box-sizing: border-box;
}

.form {
  display: flex;
  flex-direction: column;
    padding: 24px 16px 80px;
  gap: 16px;
  margin-top: 24px;
  font-weight: 550;
}
</style>
