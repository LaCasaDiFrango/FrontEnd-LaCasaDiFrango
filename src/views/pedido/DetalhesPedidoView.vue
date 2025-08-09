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
const pedidoCodigo = '19'

// Pega a store
const pedidoStore = usePedidoStore()

// Mapeamento dos próximos status
const proximoStatus = {
  Carrinho: 'Realizado',
  Realizado: 'Pago',
  Pago: 'Entregue',
  Entregue: null,
}

// Função para carregar o pedido na montagem
async function carregarPedido() {
  try {
    await pedidoStore.carregarPedidoPorCodigo(pedidoCodigo)
  } catch (e) {
    console.error('Erro ao carregar pedido:', e)
  }
}

// Função para avançar o status
async function avancarStatus() {
  if (!pedidoStore.pedidoAtual) return

  const atual = pedidoStore.pedidoAtual.status
  const novo = proximoStatus[atual]

  if (!novo) {
    alert('Pedido já está no status final.')
    return
  }

  try {
    await pedidoStore.atualizarStatusPedido(pedidoStore.pedidoAtual.id, novo)
    alert(`Status atualizado para ${novo}`)
  } catch (e) {
    alert('Erro ao atualizar status.')
    console.error(e)
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
      <StatusPedidoCard :status="pedido.status" :data="String(29/12/2025)" :id="pedido.id" />

      <DetalhePedidoItensCard :itens="pedido.itens" />

      <DetalhePedidoTotalCard :total="pedido.total" />

      <button
        @click="avancarStatus"
        :disabled="!proximoStatus[pedido.status]"
        style="margin: 16px 0; padding: 10px 20px;"
      >
        Avançar Status (atual: {{ pedido.status }})
      </button>

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
