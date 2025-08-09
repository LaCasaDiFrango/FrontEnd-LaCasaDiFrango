<script setup>
import { onMounted } from 'vue'
import { usePedidoStore } from '@/stores/index'
import { TitlePages, HistoricoPedidoCard } from '@/components/index'

const pedidoStore = usePedidoStore()

onMounted(async () => {
  await pedidoStore.carregarPedidos()  // busca os pedidos do usuário no backend
})
</script>

<template>
  <div class="historico-container">
    <TitlePages title="Histórico de pedidos" class="first-child" />
    <HistoricoPedidoCard :pedidos="pedidoStore.pedidos" />
  </div>
</template>te>

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
