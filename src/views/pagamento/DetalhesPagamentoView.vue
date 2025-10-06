<script setup>
import { TitlePages, RetiradaCard, FormaPagamentoSelector, FooterFixed } from '@/components/index'
import { useRouter } from 'vue-router'
import { usePedidoStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

const router = useRouter()

const pedidoStore = usePedidoStore()
const { pedidoAtual } = storeToRefs(pedidoStore)
</script>

<template>
  <div class="pagamento-container">
    <TitlePages title="Detalhes do pagamento" @click="$router.back()" />

    <RetiradaCard 
    title="Ponto de Retirada"
    endereco="Av. Brasil, 1200 - Centro, Joinville - SC"
  />

    <h2 class="pagamento-titulo">Formas de pagamento</h2>

    <FormaPagamentoSelector :metodos="paymentMethods" v-model:selecionado="selectedMethod" />

    <div class="cartoes">
      <div class="cartao-linha" v-for="n in 2" :key="n">
        <img src="@/assets/img/cartao-de-credito.png" class="cartao-icon" />
        <span>VISA****9032</span>
      </div>
    </div>
<FooterFixed :itens="pedidoAtual?.itens">
  <button class="botao-verde" @click="router.push(`/home/perfil/historico-pedidos/detalhes-pedido/${pedidoAtual?.id || ''}`)">Efetuar o Pagamento</button>
</FooterFixed> 


  </div>
</template>

<style scoped>
.pagamento-container {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}

.pagamento-titulo {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

.cartoes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
}

.cartao-linha {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
}

.cartao-icon {
  width: 24px;
  height: auto;
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
