<script setup>
import {ProductCardAdmin} from '@/components/index'

defineProps({
  categoryName: String,
  items: Array,
  mostrarQuantidade: { type: Boolean, default: true },
  mostrarPreco: { type: Boolean, default: true },
})

</script>

<template>
  <div class="categoriaCardapio">
    <h3>{{ categoryName }}</h3>
    <div class="main">
<ProductCardAdmin
  v-for="(item, index) in items"
  :key="index"
  :id="item.id"
  :nome="item.nome"
  :quantidade=13
  :image="item.image"
  :preco="item.preco"
  :mostrarQuantidade="mostrarQuantidade"
  :mostrarPreco="mostrarPreco"
/>

    </div>
  </div>
</template>

<style scoped>
.categoriaCardapio {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.categoriaCardapio h3 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.categoriaCardapio .main{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    gap: 20px;
}
</style>
