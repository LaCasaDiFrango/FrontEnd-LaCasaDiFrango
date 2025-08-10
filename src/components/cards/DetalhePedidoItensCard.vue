<script setup>
defineProps({
  itens: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="pedido-itens">
    <h3>Seu Pedido</h3>
    <div v-for="item in itens" :key="item.id || item.produto?.id || item.nome" class="item">
      <p>
        <strong>{{ item.quantidade }}</strong> {{ item.nome || item.produto?.nome || 'Sem nome' }}
      </p>
      <p class="preco">
        R$ {{
          (Number(item.preco ?? item.produto?.preco ?? 0))
            .toFixed(2)
            .replace('.', ',')
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.pedido-itens {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  align-items: start;
}

.pedido-itens h3 {
  font-size: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: column;
  gap: 10px;
}

.preco {
  font-weight: bold;
}
</style>
