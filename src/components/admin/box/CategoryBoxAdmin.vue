<script setup>
import { ProductCardPedido, ProductCardAdmin } from '@/components/index'

const props = defineProps({
  categoryName: String,
  items: {
    type: Array,
    default: () => [],
  },
  tipo: {
    type: String,
  },
  mostrarQuantidade: { type: Boolean, default: true },
  mostrarPreco: { type: Boolean, default: true },
})
</script>

<template>
  <div class="w-full flex flex-col gap-6 categoriaCardapio">
    <h3 class="text-2xl font-semibold text-gray-800">{{ categoryName }}</h3>
<div class="flex flex-wrap justify-start gap-6 main">
  <template v-if="tipo === 'pedido'">
    <ProductCardPedido
      v-for="(item, index) in items"
      :key="index"
      :id="item.id"
      :nome="item.nome"
      :image="item.image"
      :preco="item.preco"
    />
  </template>

  <template v-else-if="tipo === 'estoque'">
    <ProductCardAdmin
      v-for="(item, index) in items"
      :key="index"
      :id="item.id"
      :nome="item.nome"
      :quantidade="item.quantidade_em_estoque"
      :image="item.image"
      :preco="item.preco"
      :mostrarQuantidade="mostrarQuantidade"
      :mostrarPreco="mostrarPreco"
    />
  </template>
    </div>
  </div>
</template>
<style scoped>
.categoriaCardapio .main > * {
  flex: 1 1 220px; /* largura base, mas ajustável */
  max-width: 250px; /* impede que fiquem grandes demais */
  display: flex;
  justify-content: center;
}
</style>
