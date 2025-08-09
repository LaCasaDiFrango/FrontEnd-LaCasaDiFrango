<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  pedidos: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const statusMap = {
  1: 'Carrinho',
  2: 'Realizado',
  3: 'Pago',
  4: 'Entregue',
}

const pedidosFormatados = computed(() =>
  props.pedidos.map(pedido => ({
    ...pedido,
    statusNome: statusMap[pedido.status] || pedido.status
  }))
)
</script>


<template>
  <div class="pedido" v-for="pedido in pedidosFormatados" :key="pedido.id" @click="() => router.push('/home/perfil/historico-pedidos/detalhes-pedido/' + pedido.id)">
    <img src="@/assets/img/logo.png" alt="Frango" class="icone" />
    <div class="pedido-info">
      <p class="codigo">Pedido <strong>#{{ pedido.id }}</strong></p>
      <p class="status"         :class="{
          entregue: pedido.statusNome === 'Entregue',
          realizado: pedido.statusNome === 'Realizado',
          pago: pedido.statusNome === 'Pago',
          carrinho: pedido.statusNome === 'Carrinho',
        }">{{ pedido.statusNome }}</p>
      <p class="data">{{ pedido.data || 'Data não disponível' }}</p>
    </div>
    <span
      class="seta">
      <img src="/src/assets/img/left-chevron.png" alt="Seta" />
    </span>
  </div>
</template>

<style scoped>
.pedido {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  justify-content: space-between;
  width: 100%;
}

.pedido img {
  width: 80px;
  height: auto;
}

.pedido-info {
  flex: 1;
}

.codigo {
  font-size: 16px;
  color: #000;
  margin: 0;
}

.status {
  font-size: 14px;
  margin: 2px 0;
}

.status.entregue {
  color: #0a7d00; /* verde escuro */
}

.status.realizado {
  color: #ff9800; /* laranja */
}

.status.pago {
  color: #1565c0; /* azul escuro */
}

.status.carrinho {
  color: #616161; /* cinza */
}

.data {
  font-size: 12px;
  color: #777;
}

.seta {
  display: flex;
  align-items: center;
  justify-content: center;
  rotate: 180deg;
}

.seta img {
  width: 20px;
  height: 20px;
}
</style>
