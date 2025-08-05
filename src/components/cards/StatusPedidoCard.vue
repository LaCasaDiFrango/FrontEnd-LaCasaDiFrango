<script setup>
defineProps({
  status: String,
  data: String,
  codigo: String
})
</script>

<template>
  <div class="status-container">
    <img src="@/assets/img/chicken-leg.png" alt="Frango" class="icone" />
    <div class="status-info">
      <p :class="['status', status.toLowerCase()]">{{ status }}</p>
      <p class="data">{{ data }}</p>
    </div>
    <p class="codigo"><strong>Pedido #{{ codigo }}</strong></p>
  </div>
</template>

<style scoped>
.status-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
}

.icone {
  width: 40px;
  height: 40px;
}

.status-info {
  flex: 1;
}

.status {
  font-size: 16px;
  font-weight: bold;
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

.codigo {
  font-size: 14px;
}
</style>
