<script setup>
import { defineProps } from 'vue'
import { BackButton } from '@/components/index'

const props = defineProps({
  title: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <BackButton />
  <h2>{{ title }}</h2>
</template>

<style scoped></style>
