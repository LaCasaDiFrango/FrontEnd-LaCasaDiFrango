<template>
  <div class="input-group">
    <div class="input-wrapper" :class="{ focused: isFocused || modelValue }">
      <label>{{ label }}</label>
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  }
})

const isFocused = ref(false)
</script>

<style scoped>
.input-group {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  margin-top: 1rem;
}

.input-wrapper input {
  width: 100%;
  padding: 1.2rem 0.75rem 0.5rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  outline: none;
}

.input-wrapper label {
  position: absolute;
  top: 1rem;
  left: 0.75rem;
  font-size: 1rem;
  color: #666;
  background-color: white;
  padding: 0 0.25rem;
  transition: 0.2s ease;
  pointer-events: none;
}

/* Quando focado ou preenchido */
.input-wrapper.focused label {
  top: -0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
  color: #000;
  background: #fff;
}
</style>
