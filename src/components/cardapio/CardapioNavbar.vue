<script setup>
defineProps({
  categories: Array
})
</script>
<template>
    <div class="nav">
      <div class="categorias" v-for="cat in categories" :key="cat.categoryName">
        <img src="@/assets/img/chicken-leg.png" alt="Categorias" />
        <span>{{ cat.categoryName }}</span>
      </div>
    </div>
</template>
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav .categorias {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.nav .categorias img {
  width: 50px;
  height: 50px;
}


</style>