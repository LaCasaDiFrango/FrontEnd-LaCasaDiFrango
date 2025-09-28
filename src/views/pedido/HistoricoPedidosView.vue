<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePedidoStore, useAuthStore } from '@/stores/index'
import { TitlePages, HistoricoPedidoCard, SemPermission, PedidoSemItens } from '@/components/index'

const pedidoStore = usePedidoStore()
const authStore = useAuthStore()

const { pedidos } = storeToRefs(pedidoStore)
const { isGuest, isUser } = storeToRefs(authStore)

onMounted(async () => {
  if (isUser.value) {
    await pedidoStore.carregarPedidos()
  }
})
</script>

<template>
  <div class="historico-container">
    <TitlePages title="Histórico de pedidos" class="first-child" @click="$router.back()" />

    <!-- Convidado -->
    <SemPermission
      v-if="isGuest"
      text="Para visualizar seu histórico de pedidos, faça login ou se cadastre!"
    />

    <!-- Usuário autenticado -->
    <template v-else-if="isUser">
      <!-- Se tiver pedidos -->
      <HistoricoPedidoCard
        v-if="pedidos.length > 0"
        :pedidos="pedidos"
      />

      <!-- Sem pedidos -->
      <PedidoSemItens
        v-else
        text="Você ainda não realizou nenhum pedido."
      />
    </template>

    <!-- Outros perfis -->
    <SemPermission
      v-else
      text="Você não tem permissão para acessar esta página."
    />
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
