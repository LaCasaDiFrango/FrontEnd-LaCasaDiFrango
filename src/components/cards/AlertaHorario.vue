<template>
  <div class="alerta-container">
    <img :src="icon" :alt="title" class="alert-icon" />
    <p class="alert-title">{{ title }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [String, Object], // aceita o import da imagem
    required: true
  },
  title: {
    type: String,
    default: 'ATENÇÃO'
  }
})
</script>

<style scoped>
.alerta-container {
  text-align: center;
  margin: 52px 0;
}

.alert-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 12px;
}

.alert-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 6px;
  color: #000;
}
</style>
