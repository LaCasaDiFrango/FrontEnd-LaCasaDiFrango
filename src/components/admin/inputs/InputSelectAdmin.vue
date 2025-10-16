<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-600">
      {{ label }}
    </label>
    <select
      class="w-full px-4 py-3 border border-gray-300 rounded-lg ring-1 ring-gray-400 bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600  transition duration-150"
      :value="modelValue"
      @change="$emit('action', $event.target.value)"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
  }
})

defineEmits(['action'])
</script>
