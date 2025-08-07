<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePedidoStore } from '@/stores/index'
import { BackButton } from '@/components/index'

const router = useRouter()
const { pedidoAtual, carregarPedidoAtual, finalizarPedido } = usePedidoStore()

onMounted(async () => {
  await carregarPedidoAtual()
  console.log('Pedidos:', carregarPedidoAtual.pedidos)
})

const total = computed(() => {
  if (!pedidoAtual) return 0
  return pedidoAtual.itens?.reduce((soma, item) => soma + item.total, 0) || 0
})

async function finalizar() {
  try {
    await finalizarPedido(pedidoAtual.id)
    alert('Pedido finalizado com sucesso!')
    router.push('/produtos')
  } catch (err) {
    alert('Erro ao finalizar pedido.')
  }
}
</script>

<template>
  <div class="pedido-container">
    <BackButton />
    <h2>Meu Pedido</h2>

    <!-- Lista de itens do pedido -->
     <div class="pedidos">
    <div
      v-for="item in pedidoAtual?.itens"
      :key="item.produto.id"
      class="item-selecionado"
    >
      <div class="item-info">
      <img :src="item.produto.image || '/src/assets/img/chicken-leg.png'" alt="Produto" class="item-img" />
      <div class="sub-info">
        <p class="item-nome">{{ item.produto.nome }}</p>
        <p class="preco">R$ {{ Number(item.produto.preco).toFixed(2).replace('.', ',') }}</p>
        </div>
      </div>
      <div class="quantidade-controles">
        <span>Qtd: {{ item.quantidade }}</span>
      </div>
    </div>
</div>
    <!-- Total e botões -->
    <div class="footer">
      <div class="total">
        <p>Total</p>
        <p>R$ {{ Number(total).toFixed(2).replace('.', ',') }}</p>
      </div>

      <div class="botoes">
        <button class="botao-claro" @click="router.push('/home/produtos')">Adicionar Produtos</button>
        <button class="botao-verde" @click="router.push('/home/pedidos/detalhes-pagamento')">Proxima Etapa</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pedido-container {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}

.pedidos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 80dvh;
  overflow-y: auto;
}

.item-selecionado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid 000;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.item-img {
  width: 48px;
  height: 48px;
}

.sub-info {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.25rem;
}

.item-nome {
  font-weight: 500;
  font-size: 1rem;
}

.quantidade-controles {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantidade-controles button {
  background-color: #e0e0e0;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.preco {
  font-weight: 600;
  color: green;
  text-align: right;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.total {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  font-weight: 600;
  font-size: 1.125rem;
  padding: 1rem;
  width: 100%;
}

.botoes {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.botao-claro,
.botao-verde {
  flex: 1;
  padding: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}

.botao-claro {
  background-color: #f9f9f9;
  border-top: 2px solid #000;
}

.botao-verde {
  background-color: #1e7e34;
  border-top: 2px solid #1e7e34;
  color: white;
}
</style>
