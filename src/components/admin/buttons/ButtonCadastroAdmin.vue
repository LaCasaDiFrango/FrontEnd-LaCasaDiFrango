<template>
  <button
    @click="$emit('click')"
    class="w-full max-w-[200px] py-3 px-6 bg-[#000000] text-white text-sm font-semibold rounded-lg hover:bg-[#030303] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B91C1C] focus:ring-offset-1"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Cadastrar'
  }
})

defineEmits(['click'])
</script>
