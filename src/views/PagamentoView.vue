<template>
  <div class="pagamento-container">
    <BackButton />

    <h1 class="title">Formas de pagamento</h1>
    <p class="subtitle">Você ainda não tem um formato de pagamento salvo.</p>

    <img
      class="payment-image"
      src="/src/assets/img/credit-card.png"
      alt="Imagem pagamento"
    />

    <button class="add-payment-button">
      <img class="icon" src="../assets/img/plus.png" alt="Adicionar" />
      <router-link to="/debitandcredit">
      <span class="text">Adicionar formato de pagamento</span>
      </router-link>
    </button>
  </div>
</template>

<script setup>
import {BackButton} from '@/components/index'
</script>

<style scoped>
.pagamento-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: flex-start;
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 12px;
}

.subtitle {
  font-size: 1rem;
  color: #4b4b4b;
  margin: 30px 0;
  max-width: 90%;
}

.payment-image {
  width: 140px;
  height: auto;
  margin: 24px auto;
  display: block;
}

.add-payment-button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin:auto;
}

.add-payment-button .icon {
  font-size: 1.1rem;
}
</style>
