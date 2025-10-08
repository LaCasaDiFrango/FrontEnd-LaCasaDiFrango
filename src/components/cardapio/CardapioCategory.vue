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
      :id="item.id"
      :nome="item.nome"
      :preco="item.preco"
      :image="item.image"
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
  font-weight: 600;
}
</style>
