<script setup>
import { useAttrs } from 'vue'
import { BackButton } from '@/components/index'

const attrs = useAttrs()
defineProps({
  title: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['click'])
</script>

<template>
  <div class="page-header" v-bind="attrs">
    <BackButton @click="emit('click')" />
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
