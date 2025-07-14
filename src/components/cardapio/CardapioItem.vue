<script setup>
defineProps({
  nome: String,
  preco: String,
  image: String,
})
</script>

<template>
  <div class="cardapioItem">
    <img :src="image" :alt="nome" />
    <div class="itemInfo">
      <h4>{{ nome }}</h4>
      <span>{{ preco }}</span>
    </div>
  </div>
</template>

<style scoped>
.cardapioItem {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
}

.cardapioItem img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}

.itemInfo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.itemInfo h4 {
  font-size: 20px;
  color: #333;
}

.itemInfo span {
  font-size: 18px;
  color: #000;
}
</style>
