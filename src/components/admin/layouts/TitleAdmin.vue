<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>

<template>
  <div class="flex flex-col gap-1">
<h1 class="text-[1.3rem] font-semibold text-black">
  {{ title }}
</h1>

    <p class="text-sm text-gray-500">
      {{ subtitle }}
    </p>
  </div>
</template>
