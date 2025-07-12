<template>
  <div class="frango-card">
    <img :src="icon" alt="Ícone do frango" class="frango-icon" />
    <span class="frango-label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  icon: String,
})
</script>

<style scoped>
.frango-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 5px;
  width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
 
}

.frango-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
  
}

.frango-label {
  font-size: 13px;
  text-align: center;
  color: #333;
  font-weight: 550;
}
</style>
