<template>
  <BackButton />
  <div class="payment-container">
    <h1 class="title">Adicionar formas de Pagamento</h1>

    <PaymentOption
      title="Cartão de crédito"
      :icon="iconCredito"
      :isExpanded="formAberto === 'credito'"
      @toggle="toggleForm('credito')"
    />

    <PaymentOption
      title="Cartão de débito"
      :icon="iconDebito"
      :isExpanded="formAberto === 'debito'"
      @toggle="toggleForm('debito')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PaymentOption from '../components/cards/PaymentOption.vue'
import iconCredito from '@/assets/img/cartao-de-credito.png'
import iconDebito from '@/assets/img/sem-contato.png'
import BackButton from '@/components/buttons/BackButton.vue'

const formAberto = ref(null)

function toggleForm(tipo) {
  if (formAberto.value === tipo) {
    formAberto.value = null // fecha se clicar no mesmo
  } else {
    formAberto.value = tipo // abre o selecionado
  }
}
</script>

<style scoped>
.payment-container {
  max-width: 540px;
  margin: 3rem auto;
  padding: 32px;
  background: #fff;
}

.title {
  font-size: 30px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 28px;
  text-align: center;
}
</style>
