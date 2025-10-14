<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-600">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('action', $event.target.value)"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg ring-1 ring-gray-400 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#B91C1C] focus:border[#B91C1C] transition duration-150"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
})

defineEmits(['action'])
</script>
