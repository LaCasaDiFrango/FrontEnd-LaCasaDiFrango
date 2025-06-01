<template>
  <button :class="[filled ? 'filled' : 'outlined']">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  filled: Boolean
})
</script>

<style scoped>
.filled {
  width: 100%;
  padding: 1rem 0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #1b3d1f; /* verde escuro */
  color: white;
  border: none;
}

.outlined {
  width: 100%;
  padding: 1rem 0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: white;
  color: #1b3d1f;
  border: 1px solid #1b3d1f;
}
</style>
