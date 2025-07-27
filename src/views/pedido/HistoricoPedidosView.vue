<script setup>
import { BackButton } from '@/components/index'
const pedidos = [
  { id: 1, codigo: '3frd', status: 'Entregue', data: '13/07/2025' },
  { id: 2, codigo: 'pas6', status: 'Cancelado', data: '13/07/2025' },
  { id: 3, codigo: '54gh', status: 'Entregue', data: '13/07/2025' },
  { id: 4, codigo: '666f', status: 'Cancelado', data: '13/07/2025' },
];
</script>

<template>
  <div class="historico-container">
    <BackButton />
    <h2>Histórico</h2>

    <div class="pedido" v-for="pedido in pedidos" :key="pedido.id">
      <img src="@/assets/img/chicken-leg.png" alt="Frango" class="icone" />
      <div class="pedido-info">
        <p class="codigo">Pedido <strong>#{{ pedido.codigo }}</strong></p>
        <p :class="['status', pedido.status.toLowerCase()]">{{ pedido.status }}</p>
        <p class="data">{{ pedido.data }}</p>
      </div>
      <span class="seta"><img src="/src/assets/img/left-chevron.png" alt="Seta"></span>
    </div>
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

h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
}

.pedido {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  justify-content: space-between;
  width: 100%;
}

.icone {
  width: 40px;
  height: 40px;
  margin-right: 12px;
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
