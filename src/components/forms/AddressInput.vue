<template>
  <div class="address-input">
    <span class="icon"><img src="/src/assets/img/search.png" alt=""></span>
    <input
      type="text"
      placeholder="Endereço e número"
      class="input"
    />
  </div>
</template>

<script setup>

</script>

<style scoped>
.address-input {
  display: flex;
  align-items: center;
  border: 1px solid #999;
  border-radius: 6px;
  padding: 8px 12px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.icon {
  margin-right: 8px;
  color: #666;
}

.icon img {
  width: 20px;
  height: 20px;
}

.input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
}
</style>
