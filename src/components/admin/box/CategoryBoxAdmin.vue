<script setup>
import { ProductCardPedido } from '@/components/index'

defineProps({
  categoryName: String,
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <h3 class="text-2xl font-semibold text-gray-800">{{ categoryName }}</h3>

    <div class="flex flex-wrap gap-6">
      <ProductCardPedido
        v-for="(item, index) in items"
        :key="index"
        :id="item.id"
        :nome="item.nome"
        :image="item.image"
        :preco="item.preco"
      />
    </div>
  </div>
</template>
