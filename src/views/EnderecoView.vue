<template>
  <div class="page">
    <!-- Topo -->
    <div class="top-section">
      <!-- Botão voltar alinhado à esquerda -->
      <div class="back-button-wrapper">
        <BackButton />
      </div>
       <ManualAddressButton />
      <!-- Imagem de localização -->
      <div class="image-placeholder">
        <img src="@/assets/img/delivery.png" alt="Entrega" /> 
      </div>

      <p class="instruction-text">
        Adicione seu endereço de entrega
      </p>

      <!-- Input de endereço -->
      <AddressInput />

     
    </div>

    <!-- Rodapé com frango -->
    <div class="footer-image">
      <img src="@/assets/img/logo.png" alt="Frango" />
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/buttons/BackButton.vue'
import AddressInput from '@/components/forms/AddressInput.vue'
import ManualAddressButton from '@/components/buttons/ManualAddressButton.vue'
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 44px 16px;
  box-sizing: border-box;
  text-align: center;
}

.top-section {
  position: relative;
}




.image-placeholder {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.image-placeholder img {
  width: 140px;
  height: 140px;
  border-radius: 8px;
}

.instruction-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 600;
}

.footer-image {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.footer-image img {
  width: 120px;
  height: 70px;
}
</style>
