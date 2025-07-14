<script setup>
import {CardapioItem} from '@/components/index'

defineProps({
  categoryName: String,
  items: Array
})
</script>

<template>
  <div class="categoriaCardapio">
    <h3>{{ categoryName }}</h3>
    <CardapioItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :price="item.price"
      :imgSrc="item.imgSrc"
      :imgAlt="item.imgAlt"
    />
  </div>
</template>

<style scoped>
.categoriaCardapio {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.categoriaCardapio h3 {
  font-size: 24px;
  color: #333;
}
</style>
