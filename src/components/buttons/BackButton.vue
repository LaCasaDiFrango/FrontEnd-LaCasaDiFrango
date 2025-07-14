<template>
  <div class="back-wrapper">
    <button @click="$router.back()">
      <img src="/src/assets/img/left-chevron.png" alt="">
    </button>
  </div>
</template>

<style scoped>
.back-wrapper {
  position: fixed;
  top: 1rem; 
  left: 1rem; 
  z-index: 1000; 
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
}

button img {
  width: 24px;
  height: 24px;
}

</style>
