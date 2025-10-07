<!-- src/components/admin/buttons/ButtonActionAdmin.vue -->
<script setup>
import { computed } from 'vue'
import { ButtonDropdown } from '@/components/index' // ajuste import conforme sua estrutura

const props = defineProps({
  title: { type: String, default: 'Ação' },
  showDropdown: { type: Boolean, default: false },
  options: { type: Array, default: () => [] }, // [{ label, action }]
  selectedOption: { type: [Object, String, Number, null], default: null }
})

const emit = defineEmits(['click', 'update:selectedOption'])

// rótulo mostrado: label da option selecionada ou title fallback
const displayedLabel = computed(() => {
  const s = props.selectedOption
  if (!s) return props.title
  return (s.label ?? String(s))
})

const onMainClick = () => {
  const s = props.selectedOption
  if (s && typeof s.action === 'function') {
    // executa a ação associada à option
    s.action()
    // opcional: você poderia também emitir algo como emit('executed', s)
  } else {
    // se não há option selecionada, avisa o pai (p.ex. para abrir o dropdown)
    emit('click')
  }
}

// quando o dropdown atualiza a opção (vindo do ButtonDropdown), reemite para o pai
const onDropdownUpdate = (val) => {
  emit('update:selectedOption', val)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 relative ml-[5%]">
    <label class="text-lg text-gray-500 font-semibold">Ação:</label>

    <div class="flex items-center gap-2 relative">
      <button
        class="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-5 rounded-md transition"
        @click="onMainClick"
      >
        <span class="text-xl">＋</span>
        <span class="text-xl font-normal">{{ displayedLabel }}</span>
      </button>

      <ButtonDropdown
        v-if="showDropdown"
        class="sm:absolute sm:left-0 sm:top-[55px]"
        :options="options"
        :modelValue="selectedOption"
        @update:modelValue="onDropdownUpdate"
      />
    </div>
  </div>
</template>
