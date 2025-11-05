<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl p-6 w-[380px] text-center animate-fade-in">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">
          {{ title || 'Confirmar Exclusão' }}
        </h2>
        <p class="text-gray-600 mb-6">
          Tem certeza que deseja excluir
          <span class="font-semibold text-gray-800">{{ itemName }}</span>?
          Essa ação não poderá ser desfeita.
        </p>

        <div class="flex justify-center gap-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 rounded-lg bg-[#B91C1C] text-white hover:bg-[#991B1B]"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  show: Boolean,
  item: Object,
  title: String,
})

const emit = defineEmits(['confirm', 'close'])

const itemName = computed(() => {
  return props.item?.nome || props.item?.usuario || props.item?.email || `#${props.item?.id}`
})

function confirmDelete() {
  emit('confirm', props.item)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
