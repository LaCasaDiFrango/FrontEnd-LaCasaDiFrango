<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  pedidos: {
    type: Array,
    required: true
  }
})

const router = useRouter()
</script>

<template>
  <div class="pedido" v-for="pedido in pedidos" :key="pedido.id">
    <img src="@/assets/img/logo.png" alt="Frango" class="icone" />
    <div class="pedido-info">
      <p class="codigo">Pedido <strong>#{{ pedido.codigo }}</strong></p>
      <p :class="['status', pedido.status.toLowerCase()]">{{ pedido.status }}</p>
      <p class="data">{{ pedido.data }}</p>
    </div>
    <span
      class="seta"
      @click="() => router.push('/home/perfil/historico-pedidos/detalhes-pedido')"
    >
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
  color: green;
}

.status.cancelado {
  color: #b30000;
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
