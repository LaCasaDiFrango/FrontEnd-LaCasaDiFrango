<!-- src/components/admin/buttons/ButtonDropdown.vue -->
<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  options: { type: Array, required: true }, // espera array de objetos { label, action }
  modelValue: { type: [Object, String, Number, null], default: null },
  optionLabel: { type: String, default: 'label' }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selected = ref(null)

onMounted(() => {
  selected.value = props.modelValue
})

watch(() => props.modelValue, (newVal) => {
  selected.value = newVal
})

const selectOption = (option) => {
  selected.value = option
  emit('update:modelValue', option)
  isOpen.value = false
  // NÃO executamos a action aqui — a execução fica no botão principal,
  // conforme você pediu. Se quiser executar imediatamente ao selecionar, adicione:
  // if (option.action && typeof option.action === 'function') option.action()
}

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="relative">
    <button @click="toggle" class="text-gray-600 hover:text-gray-800 p-2 transition-transform">
      <img src="@/assets/img/admin/arrow-down-338-svgrepo-com.svg" alt="seta"
           class="h-4 w-4 transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
    </button>

    <transition name="dropdown">
      <ul v-if="isOpen" class="absolute sm:relative sm:left-5 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-40 overflow-hidden">
        <li v-for="option in props.options" :key="option[props.optionLabel]" @click="selectOption(option)"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
          {{ option[props.optionLabel] }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 200ms ease-out;
}
.dropdown-enter-from { opacity: 0; transform: translateY(-5px); }
.dropdown-enter-to { opacity: 1; transform: translateY(0); }
.dropdown-leave-from { opacity: 1; transform: translateY(0); }
.dropdown-leave-to { opacity: 0; transform: translateY(-5px); }
</style>
