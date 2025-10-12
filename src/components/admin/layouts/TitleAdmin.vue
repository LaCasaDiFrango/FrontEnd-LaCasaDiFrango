<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String
})

// Cria uma versão formatada do título, deixando tudo após o primeiro ">" em cinza
const formattedTitle = computed(() => {
  const parts = props.title.split(' > ')
  if (parts.length === 1) return parts[0]

  const base = parts[0]
  const rest = parts.slice(1).join(' > ')
  // “> ...” inteiro em cinza
  return `${base} <span class="text-gray-500 font-semibold">> ${rest}</span>`
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <h1
      class="text-[1.3rem] font-bold text-black"
      v-html="formattedTitle"
    ></h1>

    <p class="text-sm text-gray-500">
      {{ subtitle }}
    </p>
  </div>
</template>
