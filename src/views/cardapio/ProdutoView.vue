<script setup>
import { ref, onMounted } from 'vue'
import { produto, pedido } from '@/api/index'
import { BackButton, AddPedidoButton } from '@/components/index'

const pedidoService = new pedido.default()

const props = defineProps({
  id: [String, Number]
})

const produtoSelecionado = ref(null)
const quantidade = ref(1) // controlada pelos botões + e -

async function criarPedido() {
  try {
    const response = await pedidoService.create({
      itens: [
        {
          produto: produtoSelecionado.value.id,
          quantidade: quantidade.value,
        },
      ],
      status: 'CARRINHO',
    })

    const pedidoCriado = response
    await finalizarPedido(pedidoCriado.id)
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
  }
}

async function finalizarPedido(pedidoId) {
  try {
    const response = await pedidoService.finalizar(pedidoId)
    console.log('Pedido finalizado com sucesso!', response)
    alert('Pedido finalizado com sucesso!')
  } catch (error) {
    if (error.response?.status === 400) {
      alert(`Erro: ${error.response.data.status}\nProduto: ${error.response.data.produto}`)
    } else {
      alert('Erro ao finalizar pedido.')
      console.error('Erro inesperado:', error)
    }
  }
}

const produtoService = new produto.default()

function aumentar() {
  quantidade.value++
}

function diminuir() {
  if (quantidade.value > 1) {
    quantidade.value--
  }
}

function adicionarAoPedido() {
  console.log(`Adicionando ${quantidade.value} unidade(s) do produto`, produtoSelecionado.value)
  // Aqui você pode adicionar ao carrinho ou store
}

onMounted(async () => {
  try {
    produtoSelecionado.value = await produtoService.getById(props.id)
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  }
})
</script>

<template>
  <BackButton />
  <div class="produto-container" v-if="produtoSelecionado">
    <div class="title">
      <h1>{{ produtoSelecionado.nome }}</h1>
      <p>R$ {{ parseFloat(produtoSelecionado.preco).toFixed(2).replace('.', ',') }}</p>
    </div>

    <img :src="produtoSelecionado.image" :alt="produtoSelecionado.nome" />

    <p>{{ produtoSelecionado.descricao }}</p>

    <div class="quantidade">
      <span @click="diminuir">
        <img src="@/assets/img/minus.png" alt="Menos" />
      </span>
      <span>{{ quantidade }}</span>
      <span @click="aumentar">
        <img src="@/assets/img/plus.png" alt="Mais" />
      </span>
    </div>
  </div>

  <AddPedidoButton @click="criarPedido" />
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

.produto-container .quantidade span {
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
