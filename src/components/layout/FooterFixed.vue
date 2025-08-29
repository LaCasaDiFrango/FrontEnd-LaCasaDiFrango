<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  itens: {
    type: Array,
    default: () => [],
  },
})

const total = computed(() => {
  return (
    props.itens?.reduce((soma, item) => {
      const valor =
        Number(item.total) || Number(item?.produto?.preco) * Number(item?.quantidade) || 0
      return soma + valor
    }, 0) || 0
  )
})
</script>

<template>
  <div class="footer">
    <div class="total">
      <p>Total</p>
      <p>R$ {{ total.toFixed(2).replace('.', ',') }}</p>
    </div>

    <div class="botoes">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.total {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  font-weight: 600;
  font-size: 1.125rem;
  padding: 1.7rem 0;
  width: 100%;
}

.botoes {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.botao-verde {
  flex: 1;
  padding: 2rem 0;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  background-color: #1d4523;
  border-top: 2px solid #1d4523;
  color: white;
}
</style>
