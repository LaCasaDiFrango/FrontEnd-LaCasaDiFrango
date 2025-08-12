<template>
  <div class="pagamento-container">
    <TitlePages title="Formas de pagamento"/>
    <p class="subtitle">Você ainda não tem um formato de pagamento salvo.</p>

    <img
      class="payment-image"
      src="/src/assets/img/credit-card.png"
      alt="Imagem pagamento"
    />

    <button class="add-payment-button" :onClick="() => router.push('/home/perfil/pagamento/debitandcredit')">
      <img class="icon" src="@/assets/img/plus.png" alt="Adicionar" />
      <span class="text">Adicionar formato de pagamento</span>
    </button>
  </div>
</template>

<script setup>
import {TitlePages} from '@/components/index'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.pagamento-container {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}

.subtitle {
  font-size: 1rem;
  color: #4b4b4b;
  max-width: 90%;
  letter-spacing: 1.5px;
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
