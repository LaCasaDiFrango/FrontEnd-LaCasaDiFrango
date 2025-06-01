<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <input/>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

label {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  outline: none;
}
</style>
