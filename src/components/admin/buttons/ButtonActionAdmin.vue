<script setup>
import { computed } from 'vue'
import { ButtonDropdown } from '@/components/index'

const props = defineProps({
  acao: { type: String },
  showDropdown: { type: Boolean, default: false },
  options: { type: Array, default: () => [] }, // [{ label, action }]
})

const emit = defineEmits(['click'])

// Rótulo mostrado no botão principal (fallback)
const displayedLabel = computed(() => props.acao)

const onMainClick = () => {
  emit('click') // botão principal executa ação padrão
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 relative">
    <label class="text-lg text-gray-500 font-semibold">Ação:</label>

    <div class="flex items-center gap-2 relative">
      <button
        class="flex items-center gap-2 text-black font-medium py-3 px-5 rounded"
        @click="onMainClick"
      >
        <span
          class="text-2xl p-2 bg-gray-200 rounded flex justify-center items-center
                 transition-colors duration-200 hover:bg-gray-800 hover:text-white"
        >
          ＋
        </span>
        <span class="text-xl font-semibold">{{ displayedLabel }}</span>
      </button>

      <ButtonDropdown
        v-if="showDropdown"
        class="sm:absolute sm:left-0 sm:top-[55px]"
        :options="options"
        @update:modelValue="val => val.action?.()"
      />
    </div>
  </div>
</template>
