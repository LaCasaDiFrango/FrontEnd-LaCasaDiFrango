<script setup>
import { onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePedidoStore, useUiStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import {
  TitlePages,
  HelpCard,
  CommentCard,
  StatusPedidoCard,
  DetalhePedidoItensCard,
  DetalhePedidoTotalCard,
  PedidoCupom,
  LoadingPage,
} from '@/components/index'

const couponImg = new URL('@/assets/img/coupon.svg', import.meta.url).href
const creditCardImg = new URL('@/assets/img/credit-card.png', import.meta.url).href

const router = useRouter()
const pedidoStore = usePedidoStore()
const uiStore = useUiStore()
const { loading } = storeToRefs(uiStore) // ✅ reativo

const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
})

const metodoPagamento = ref('Pagar na Retirada')
const comentario = ref('') // adicionei para v-model do CommentCard

// Computeds
const pedido = computed(() => pedidoStore.pedidoAtual)
const isCarrinho = computed(() => pedido.value?.statusNome === 'Carrinho')
const isFinalizado = computed(() =>
  ['Pago', 'Entregue', 'Realizado'].includes(pedido.value?.statusNome)
)

// Funções
async function carregarPedido() {
  if (!props.id) {
    console.error('ID do pedido não fornecido via props')
    return
  }

  try {
    uiStore.showLoading()
    await pedidoStore.carregarPedidoPorCodigo(props.id)
  } catch (e) {
    console.error('Erro ao carregar pedido:', e)
  } finally {
    uiStore.hideLoading()
  }
}

async function realizarPedido() {
  if (!pedido.value?.id) {
    alert('Pedido não carregado para realizar.')
    return
  }
  try {
    await pedidoStore.atualizarStatusPedido(pedido.value.id, 'Realizado', comentario.value)
    router.push('/home/perfil/historico-pedidos')
  } catch (error) {
    alert('Erro ao realizar pedido. Tente novamente.')
  }
}

onMounted(() => {
  carregarPedido()
})
</script>

<template>
  <!-- Loading global -->
  <div v-if="loading">
    <LoadingPage />
  </div>

  <!-- Conteúdo principal -->
  <div v-else class="pedido-detalhes">
    <TitlePages title="Detalhes do pedido" class="first-child" @click="$router.back()" />

    <!-- ✅ Renderiza só se pedido existir -->
    <StatusPedidoCard
      v-if="pedido"
      :status="pedido?.statusNome"
      :data="29122025"
      :id="pedido?.id"
    />
    <DetalhePedidoItensCard
      v-if="pedido"
      :itens="pedido?.itens"
      title="Itens do Pedido"
    />
    <DetalhePedidoTotalCard
      v-if="pedido"
      :total="pedido?.total"
      title="Total"
    />

    <CommentCard
      v-model="comentario"
      label="Comentário sobre o pedido"
      placeholder="Digite sua observação..."
    />

    <PedidoCupom
      title="Cupom"
      subtitle="Código de cupom"
      :img="couponImg"
      customClass="cupom-style"
    />

    <PedidoCupom
      title="Formas de pagamentos"
      :subtitle="metodoPagamento"
      :img="creditCardImg"
      customClass="pagamento-style"
      @click="router.push('/home/pedidos/detalhes-pagamento')"
    />

    <HelpCard
      title="Precisa falar com a gente?"
      link="https://wa.me/5547999123456"
      text="Atendimento via WhatsApp"
    />

    <div v-if="isCarrinho && !isFinalizado" class="botoes">
      <button class="botao-verde" @click="realizarPedido()">Realizar Pedido</button>
    </div>
  </div>
</template>

<style scoped>
.pedido-detalhes {
  padding: 14px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
  margin: 0 0 70px 0;
}

.first-child {
  margin-bottom: 16px;
}

.botoes {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.botao-verde {
  flex: 1;
  padding: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #1d4523;
  border-top: 2px solid #1d4523;
  color: white;
}
</style>
