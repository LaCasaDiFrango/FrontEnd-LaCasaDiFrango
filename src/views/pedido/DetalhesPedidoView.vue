<script setup>
import { onMounted, computed, ref } from 'vue'
import { usePedidoStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import {
  TitlePages,
  HelpCard,
  CommentCard,
  StatusPedidoCard,
  DetalhePedidoItensCard,
  DetalhePedidoTotalCard,
  PedidoCupom,
} from '@/components/index'

const router = useRouter()
const pedidoStore = usePedidoStore()

const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
})

const metodoPagamento = ref('Pagar na Retirada') 

const pedido = computed(() => pedidoStore.pedidoAtual)

const isCarrinho = computed(() => pedido.value?.statusNome === 'Carrinho')

const isFinalizado = computed(() => ['Pago', 'Entregue', 'Realizado'].includes(pedido.value?.statusNome))


async function carregarPedido() {
  try {
    if (!props.id) {
      throw new Error('ID do pedido não fornecido via props')
    }
    await pedidoStore.carregarPedidoPorCodigo(props.id)
  } catch (e) {
    console.error('Erro ao carregar pedido:', e)
  }
}

async function realizarPedido() {
  if (!pedido.value?.id) {
    alert('Pedido não carregado para realizar.')
    return
  }
  try {
    await pedidoStore.atualizarStatusPedido(pedido.value.id, 'Realizado')
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
  <div class="pedido-detalhes">
    <TitlePages title="Detalhes do pedido" class="first-child" />

    <template v-if="!pedido">
      <p>Carregando pedido...</p>
    </template>

    <template v-else>
      <StatusPedidoCard :status="pedido.statusNome" :data="29122025" :id="pedido.id" />

      <DetalhePedidoItensCard :itens="pedido.itens" title="Itens do Pedido" />

      <DetalhePedidoTotalCard :total="pedido.total" title="Total" />
      <CommentCard
        v-model="comentario"
        label="Comentário sobre o pedido"
        placeholder="Digite sua observação..."
      />
      <PedidoCupom
        title="Cupom"
        subtitle="Código de cupom"
        img="/src/assets/img/coupon.svg"
        customClass="cupom-style"
      />

      <PedidoCupom
        title="Formas de pagamentos"
        :subtitle="metodoPagamento"
        img="/src/assets/img/credit-card.png"
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
    </template>
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
}
.botao-verde {
  background-color: #1d4523;
  border-top: 2px solid #1d4523;
  color: white;
}
</style>
