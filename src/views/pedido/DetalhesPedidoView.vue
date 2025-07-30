<script setup>
import { TitlePages, HelpCard, CommentCard, StatusPedidoCard, DetalhePedidoItensCard, DetalhePedidoTotalCard } from '@/components/index'

const pedido = {
  codigo: '3frd',
  status: 'Entregue',
  data: '13/07/2025',
  itens: [
    {
      nome: 'Frango assado sem recheio',
      quantidade: 1,
      preco: 55.0,
    },
  ],
  total: 55.0,
}
</script>

<template>
  <div class="pedido-detalhes">
    <TitlePages title="Detalhes do pedido" class="first-child" />

    <StatusPedidoCard :status="pedido.status" :data="pedido.data" :codigo="pedido.codigo" />

    <DetalhePedidoItensCard :itens="pedido.itens" />

    <DetalhePedidoTotalCard :total="pedido.total" />

    <CommentCard />

    <HelpCard />
  </div>
</template>

<style scoped>
.pedido-detalhes {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}

.first-child {
  margin-bottom: 16px;
}
</style>
