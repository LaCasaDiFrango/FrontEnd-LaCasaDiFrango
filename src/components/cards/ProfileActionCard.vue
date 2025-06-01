<template>
  <button class="action-card" @click="onClick">
    <div class="text">{{ text }}</div>
    <img :src="icon" alt="ícone" class="icon" />
  </button>
</template>

<script setup>
defineProps({
  text: String,
  icon: String,
  onClick: Function,
})
</script>

<style scoped>
.action-card {
  width: 100%;
  background-color: #264d26;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
}

.text {
  font-size: 1.7rem;
  text-align: left;
}

.icon {
  width: 70px;
  height: 70px;
}
</style>
