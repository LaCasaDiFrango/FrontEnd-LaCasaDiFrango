<template>
  <div class="category-nav">
    <button
      v-for="item in categories"
      :key="item.label"
      class="category-button"
      @click="handleClick(item)"
    >
      <img :src="item.icon" :alt="item.label" class="category-icon" />
      <span class="category-label">{{ item.label }}</span>
    </button>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  {
    label: 'Frangos',
    icon: 'src/assets/img/chicken-leg.png',
  },
  {
    label: 'Bebidas',
    icon: 'src/assets/img/soda.png',
  },
  {
    label: 'Maionese',
    icon: 'src/assets/img/mashed-potatoes.png',
  },
  {
    label: 'Outros',
    icon: 'src/assets/img/more.png',
    route: '/produtos', 
  },
]

function handleClick(item) {
  if (item.route) {
    router.push(item.route)
  }
}
</script>

<style scoped>
.category-nav {
display: flex;
justify-content: center; 
gap: 16px; 
margin: 26px 0;
flex-wrap: wrap;
}

.category-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 1px;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  width: 70px;
}

.category-icon {
  width: 37px;
  height: 37px;
  object-fit: contain;
}

.category-label {
  margin-top: 1px;
  font-size: 12px;
  color: #333;
}
</style>
