<script setup>
import { onMounted, watch } from 'vue'
import { useProdutoStore } from '@/stores/index'
import { BackButton, AddPedidoButton } from '@/components/index'

const props = defineProps({
  id: [String, Number],
})

const produtoStore = useProdutoStore()

onMounted(async () => {
  if (props.id) {
    produtoStore.produtoSelecionado = null
    await produtoStore.carregarProduto(props.id)
  }
})

watch(
  () => props.id,
  async (novoId) => {
    console.log('ID mudou para:', novoId)
    if (novoId) {
      produtoStore.produtoSelecionado = null
      await produtoStore.carregarProduto(novoId)
    }
  }
)

</script>

<template>
  <BackButton />
<div class="produto-container" v-if="produtoStore.produtoSelecionado">
  <div class="title">
    <h1>{{ produtoStore.produtoSelecionado.nome }}</h1>
    <p>R$ {{ parseFloat(produtoStore.produtoSelecionado.preco).toFixed(2).replace('.', ',') }}</p>
  </div>

  <img :src="produtoStore.produtoSelecionado.image" :alt="produtoStore.produtoSelecionado.nome" />
  <p>{{ produtoStore.produtoSelecionado.descricao }}</p>

  <div class="quantidade">
    <span @click="produtoStore.diminuir">
      <img src="@/assets/img/minus.png" alt="Menos" />
    </span>
    <span>{{ produtoStore.quantidade }}</span>
    <span @click="produtoStore.aumentar">
      <img src="@/assets/img/plus.png" alt="Mais" />
    </span>
  </div>
</div>

<AddPedidoButton label="Adicionar Pedido" @click="produtoStore.criarPedido" />
</template>

<style scoped>
.produto-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
}

.produto-container .title {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  gap: 10px;
  padding: 30px;
}

.produto-container .title h1 {
  font-size: 25px;
  letter-spacing: 1px;
}

.produto-container .title p {
  font-size: 20px;
  color: #000;
  font-weight: 500;
}

.produto-container p {
  font-size: 15px;
  color: #555;
  text-align: justify;
  letter-spacing: 1.5px;
  font-weight: 500;
}

.produto-container .quantidade {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px solid #000;
  border-radius: 20px;
  padding: 10px 20px;
}

.produto-container .quantidade img {
  cursor: pointer;
  width: 30px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
