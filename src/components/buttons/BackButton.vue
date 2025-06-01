<template>
  <div class="back-wrapper">
    <button @click="$router.back()">←</button>
  </div>
</template>

<style scoped>
.back-wrapper {
  padding: 1rem;
}

button {
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
