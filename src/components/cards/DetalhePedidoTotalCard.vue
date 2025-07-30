<script setup>
defineProps({
  total: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="total">
    <p class="label">Total</p>
    <p class="valor">R${{ total.toFixed(2).replace('.', ',') }}</p>
  </div>
</template>

<style scoped>
.total {
  padding: 40px 20px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
}

.label {
  font-size: 23px;
}

.valor {
  font-size: 23px;
}
</style>
