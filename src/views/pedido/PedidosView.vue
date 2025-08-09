<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePedidoStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { BackButton } from '@/components/index'

const router = useRouter()
const pedidoStore = usePedidoStore()
const { pedidoAtual } = storeToRefs(pedidoStore) // aqui pedidoAtual é um ref reactive oficial
const carregarPedidoAtual = pedidoStore.carregarPedidoAtual

onMounted(async () => {
  console.log('🔄 Carregando pedido atual...')
  await carregarPedidoAtual()
  console.log('📦 pedidoAtual após carregar:', JSON.parse(JSON.stringify(pedidoAtual.value)))
  
  if (pedidoAtual.value?.itens) {
    pedidoAtual.value.itens.forEach((item, idx) => {
      console.log(`🛒 Item ${idx + 1}:`, {
        id: item?.produto?.id,
        nome: item?.produto?.nome,
        preco: item?.produto?.preco,
        quantidade: item?.quantidade,
        total: item?.total
      })
    })
  } else {
    console.log('⚠️ Nenhum item no pedido.')
  }
})

const total = computed(() => {
  if (!pedidoAtual.value) return 0
  return pedidoAtual.value.itens?.reduce((soma, item) => {
    const valor = Number(item.total) || Number(item?.produto?.preco) * Number(item?.quantidade) || 0
    return soma + valor
  }, 0) || 0
})

// Computed para itens, evita erros no template caso pedidoAtual seja null
const itensPedidoAtual = computed(() => pedidoAtual.value?.itens || [])

</script>

<template>
  <div class="pedido-container">
    <BackButton />
    <h2>Meu Pedido</h2>

    <div class="pedidos">
      <div
        v-for="item in itensPedidoAtual"
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

    <div class="footer">
      <div class="total">
        <p>Total</p>
        <p>R$ {{ Number(total).toFixed(2).replace('.', ',') }}</p>
      </div>

      <div class="botoes">
        <button class="botao-claro" @click="router.push('/home/produtos')">Adicionar Produtos</button>
        <button class="botao-verde" @click="router.push('/home/pedidos/detalhes-pagamento')">Próxima Etapa</button>
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
  color: #1d4523;
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
  background-color: #1d4523;
  border-top: 2px solid #1d4523;
  color: white;
}
</style>
