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
</script>

<template>
  <div class="page-header" v-bind="attrs">
    <BackButton />
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
