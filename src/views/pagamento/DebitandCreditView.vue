<template>
  <div class="payment-container">
    <TitlePages title="Adicionar formas de Pagamento" class="first-child"/>

    <PaymentOption
      title="Cartão de crédito"
      :icon="iconCartao"
      :isExpanded="formAberto === 'credito'"
      @toggle="toggleForm('credito')"
    />

    <PaymentOption
      title="Cartão de débito"
      :icon="iconCartao"
      :isExpanded="formAberto === 'debito'"
      @toggle="toggleForm('debito')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {PaymentOption, TitlePages} from '@/components/index'

const formAberto = ref(null)

import iconCartao from '@/assets/img/cartao-de-credito.png'

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
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.payment-container .first-child {
  margin-bottom: 50px;
}

</style>
