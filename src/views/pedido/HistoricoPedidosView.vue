<script setup>
import {TitlePages, HistoricoPedidoCard} from '@/components/index'

const pedidos = [
  { id: 1, codigo: '3frd', status: 'Entregue', data: '13/07/2025' },
  { id: 2, codigo: 'pas6', status: 'Cancelado', data: '13/07/2025' },
  { id: 3, codigo: '54gh', status: 'Entregue', data: '13/07/2025' },
  { id: 4, codigo: '666f', status: 'Cancelado', data: '13/07/2025' },
];
</script>

<template>
  <div class="historico-container">
    <TitlePages title="Histórico de pedidos" class="first-child" />

    <HistoricoPedidoCard :pedidos="pedidos" />
  </div>
</template>

<style scoped>
.historico-container {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}

.first-child {
  margin-bottom: 25px;
}
</style>
