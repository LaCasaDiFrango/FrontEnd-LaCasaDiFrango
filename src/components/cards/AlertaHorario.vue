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
    type: [String, Object], // aceita import de imagem
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 52px auto;
  padding: 16px;
  max-width: 90%;

}


.alert-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
  display: block;
}

.alert-title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 6px;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

::v-deep(p) {
  text-align: center;
  font-size: 14px;
  color: #333;
  margin: 4px 0;
}
</style>
