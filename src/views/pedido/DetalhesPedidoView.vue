<script setup>
import { onMounted, computed } from 'vue'
import { usePedidoStore } from '@/stores/index'
import {
  TitlePages,
  HelpCard,
  CommentCard,
  StatusPedidoCard,
  DetalhePedidoItensCard,
  DetalhePedidoTotalCard,
} from '@/components/index'

// Código do pedido - pode vir da rota em uso real


// Pega a store
const pedidoStore = usePedidoStore()

// Função para carregar o pedido na montagem
async function carregarPedido() {
  try {
    await pedidoStore.carregarPedidoPorCodigo(pedidoStore.pedidoAtual.id)
  } catch (e) {
    console.error('Erro ao carregar pedido:', e)
  }
}


onMounted(() => {
  carregarPedido()
})

// Computed para facilitar acesso
const pedido = computed(() => pedidoStore.pedidoAtual)
</script>

<template>
  <div class="pedido-detalhes">
    <TitlePages title="Detalhes do pedido" class="first-child" />

    <template v-if="!pedido">
      <p>Carregando pedido...</p>
    </template>

    <template v-else>
      <StatusPedidoCard :status="pedido.status" :data="29122025" :id="pedido.id" />

      <DetalhePedidoItensCard :itens="pedido.itens" />

      <DetalhePedidoTotalCard :total="pedido.total" />


      <CommentCard />
      <HelpCard />
    </template>
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
