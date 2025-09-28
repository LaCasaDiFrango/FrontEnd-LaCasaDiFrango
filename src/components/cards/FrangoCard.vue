<template>
  <div class="frango-cards-container">
    <div 
      class="frango-card" 
      v-for="(item, index) in frangos" 
      :key="index" @click="$router.push(item.url) "
    >
      <img :src="item.icon" alt="Ícone do frango" class="frango-icon" />
      <span class="frango-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import ChickenIcon from '@/assets/img/chicken-leg.png'

const frangos = [
  { label: 'Recheado R$65,00.', icon: ChickenIcon, url: '/home/produtos/18' },
  { label: 'Sem Recheio R$55,00.', icon: ChickenIcon, url: '/home/produtos/17' }
]
</script>

<style scoped>
.frango-cards-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 24px 0;
}

.frango-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 16px;
  padding: 5px;
  width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.frango-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.frango-label {
  font-size: 13px;
  text-align: center;
  color: #333;
  font-weight: 550;
}
</style>
