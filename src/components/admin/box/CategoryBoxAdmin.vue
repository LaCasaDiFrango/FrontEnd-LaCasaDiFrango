<script setup>
import {ProductCardAdmin} from '@/components/index'

const props = defineProps({
  categoryName: String,
  items: Array,
  mostrarQuantidade: { type: Boolean, default: true },
  mostrarPreco: { type: Boolean, default: true },
})
// Adicione este console.log
console.log('Props recebidas pelo CategoryBoxAdmin:', props.items) 
</script>

<template>
  <div class="categoriaCardapio">
    <h3>{{ categoryName }}</h3>
    <div class="main">
<ProductCardAdmin
  v-for="item in props.items"
  :key="item.id"
  :id="item.id"
  :nome="item.nome"
  :quantidade="item.quantidade_em_estoque"
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

.categoriaCardapio .main {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.categoriaCardapio .main > * {
  flex: 1 1 220px; /* largura base, mas ajustável */
  max-width: 250px; /* impede que fiquem grandes demais */
  display: flex;
  justify-content: center;
}

</style>
