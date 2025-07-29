<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedMethod = ref('retirada')
const total = 55.00

const selectMethod = (method) => {
  selectedMethod.value = method
}
</script>

<template>
  <div class="container">
    <!-- Voltar -->
    <button @click="router.back()" class="back-button">
      ← Detalhes do pagamento
    </button>

    <!-- Local de retirada -->
    <div class="retirada-box">
      <img src="@/assets/img/logo.png" alt="Ícone" class="retirada-icon" />
      <div>
        <p class="retirada-title">Retirar em</p>
        <p class="retirada-endereco">R. Santa Catarina, 683 - Floresta, Joinville - SC</p>
      </div>
    </div>

    <!-- Formas de pagamento -->
    <p class="section-title">Formas de pagamento</p>
    <div class="payment-methods">
      <button
        v-for="method in ['PIX', 'CRÉDITO', 'DÉBITO', 'DINHEIRO']"
        :key="method"
        class="payment-button"
        :class="{ active: selectedMethod === method.toLowerCase() }"
        @click="selectMethod(method.toLowerCase())"
      >
        {{ method }}
      </button>
    </div>

    <!-- Botão pagar na retirada -->
    <button class="retirada-button" @click="selectMethod('retirada')">
      💳 Pagar na retirada
    </button>

    <!-- Cartões -->
    <div class="cards">
      <div class="card-item">
        <img src="@/assets/img/cartao-de-credito.png" alt="Card" class="card-icon" />
        <span>VISA****9032</span>
      </div>
      <div class="card-item">
        <img src="@/assets/img/cartao-de-credito.png" alt="Card" class="card-icon" />
        <span>VISA****9032</span>
      </div>
    </div>

    <!-- Total -->
    <div class="total-section">
      <span>Total</span>
      <span>R${{ total.toFixed(2).replace('.', ',') }}</span>
    </div>

    <!-- Finalizar -->
    <button class="finalizar-button">Finalizar</button>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
  font-family: sans-serif;
}

.back-button {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.retirada-box {
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.retirada-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.retirada-title {
  font-weight: bold;
  margin: 0;
}

.retirada-endereco {
  font-size: 13px;
  color: #555;
  margin: 0;
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.payment-methods {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-bottom: 20px;
}

.payment-button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.payment-button.active {
  background-color: #007c66;
  color: white;
  border-color: #007c66;
}

.retirada-button {
  width: 100%;
  background-color: #1d4523;
  color: white;
  padding: 12px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-bottom: 24px;
  cursor: pointer;
  font-size: 15px;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.card-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
}

.card-icon {
  width: 24px;
  height: 24px;
}

.total-section {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 20px;
}

.finalizar-button {
  width: 100%;
  background-color: #1d4523;
  color: white;
  padding: 12px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
</style>
