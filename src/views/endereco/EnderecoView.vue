<template>
  <div class="page">
    <!-- Topo -->
    <div class="top-section">
        <BackButton @click="$router.back()" />
       <ManualAddressButton label="+ Adicionar Manualmente" @click="goToForm" />
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
import {BackButton, AddressInput, ManualAddressButton} from '@/components/index'
import { useRouter } from 'vue-router'
const router = useRouter()

function goToForm() {
  router.push('/home/perfil/endereco/form-endereco')
}
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
