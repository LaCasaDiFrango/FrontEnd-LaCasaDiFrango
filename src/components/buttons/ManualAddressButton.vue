<template>
  <button class="manual-btn">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '+ Adicionar manualmente'
  }
})
</script>

<style scoped>
.manual-btn {
  position: fixed;
  top: 0.3rem;
  right: 1rem;
  z-index: 1000;

  display: flex;
  justify-content: flex-start;
  margin-top: 12px;

  padding: 6px 12px;
  font-size: 13px;
  color: #214225;
  background-color: transparent;

  border: 1px solid #214225;
  border-radius: 16px;
  cursor: pointer;
}

.manual-btn:hover {
  background-color: #214225;
  color: #fff;
}
</style>
