<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Buscar...'
  }
})

const emits = defineEmits(['update:modelValue'])

function onInput(event) {
  emits('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="search" role="search">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon-lupa"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      type="search"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      aria-label="Busca"
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #555;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 10px 30px;
  cursor: text;
  width: 100%;
}

.icon-lupa {
  color: #888;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  color: #555;
  width: 100%;
  background: transparent;
}
</style>
