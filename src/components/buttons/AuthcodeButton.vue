<template>
  <div class="continue-wrapper">
    <button @click="onClick">
      <RouterLink to="/telefonelogin" class="text-white">
        Continuar
      </RouterLink>
    </button>
  </div>
</template>

<script setup>
defineProps({
  onClick: Function
})
</script>

<style scoped>
.continue-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1b3d1f;
  padding: 1rem;
  z-index: 10;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>