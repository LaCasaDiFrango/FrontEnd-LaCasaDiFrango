<script setup>
defineProps({
  title: {
    type: String,
    default: 'Nossa História'
  },
  text: {
    type: String,
    default: 'Conheça nossa história de 31 anos de comércio, nossa equipe e algumas lembranças'
  }
})
</script>

<template>
  <div class="historia-container">
    <img src="/src/assets/img/file.png" alt="História" class="historia-icon" />
    <h3 class="historia-title">{{ title }}</h3>
    <p class="historia-text">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.historia-container {
  text-align: center;
  margin: 28px 0;
}

.historia-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 6px;
}

.historia-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #111;
}

.historia-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}
</style>
