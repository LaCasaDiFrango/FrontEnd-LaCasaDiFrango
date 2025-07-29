<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BackButton } from '@/components/index'


// Lista com nome + imagem de cada método
const paymentMethods = [
  {
    name: 'PIX',
    image: new URL('@/assets/img/qrcode.svg', import.meta.url).href
  },
  {
    name: 'CRÉDITO',
    image: new URL('@/assets/img/cartao-de-credito.png', import.meta.url).href
  },
  {
    name: 'DÉBITO',
    image: new URL('@/assets/img/cartao-de-credito.png', import.meta.url).href
  },
]

const selectedMethod = ref(paymentMethods[0])
const router = useRouter()
const total = 55.00

const selectMethod = (method) => {
  selectedMethod.value = method
}

const finalizarPedido = () => {
  alert(`Pedido finalizado com pagamento via ${selectedMethod.value.name}`)
}
</script>


<template>
  <div class="pagamento-container">
    <!-- Cabeçalho -->
    <BackButton />
    <h2>Detalhes do pagamento</h2>

    <!-- Endereço de retirada -->
    <div class="retirada-card">
      <img src="@/assets/img/logo.png" class="retirada-icon" alt="logo" />
      <div class="retirada-texto">
        <span class="retirada-title">Retirar em</span>
        <span class="retirada-endereco">R. Santa Catarina, 683 - Floresta, Joinville - SC</span>
      </div>
    </div>

    <!-- Título -->
    <h2 class="pagamento-titulo">Formas de pagamento</h2>

    <!-- Métodos de pagamento -->
<div class="botoes-pagamento">
  <button
    v-for="method in paymentMethods"
    :key="method.name"
    :class="{ active: selectedMethod.name === method.name }"
    @click="selectMethod(method)"
  >
    <img :src="method.image" :alt="method.name">
    {{ method.name }}
  </button>
</div>


    <!-- Botão pagar na retirada -->
    <button class="botao-retirada" @click="selectMethod('retirada')">
      <img src="@/assets/img/wallet.png" class="icone-retirada" alt="ícone" />
      Pagar na retirada
    </button>

    <!-- Cartões -->
    <div class="cartoes">
      <div class="cartao-linha">
        <img src="@/assets/img/cartao-de-credito.png" class="cartao-icon" />
        <span>VISA****9032</span>
      </div>
      <div class="cartao-linha">
        <img src="@/assets/img/cartao-de-credito.png" class="cartao-icon" />
        <span>VISA****9032</span>
      </div>
    </div>

    <!-- Total e botão -->
    <div class="footer">
      <div class="total">
        <p>Total</p>
        <p>R$ {{ Number(total).toFixed(2).replace('.', ',') }}</p>
      </div>

      <div class="botoes">
        <button class="botao-verde" @click="finalizarPedido">Finalizar</button>
      </div>
    </div>
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

.retirada-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  gap: 5px;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.retirada-icon {
  width: 60px;
  height: auto;
}

.retirada-texto {
  display: flex;
  flex-direction: column;
}

.retirada-title {
  font-weight: bold;
  font-size: 14px;
}

.retirada-endereco {
  font-size: 13px;
  color: #555;
}

.pagamento-titulo {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

.pagamento-metodos {
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
  gap: 12px;
}

.botoes-pagamento{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.botoes-pagamento button{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2px;
    padding: .5rem 1rem;
    border-radius: 12px;
    font-size: .7rem;
}

.metodo-botao {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  padding: 10px 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}

.metodo-botao.ativo {
  border: 2px solid #1d4523;
}

.metodo-icone {
  width: 28px;
  height: 28px;
  margin-bottom: 4px;
}

.botao-retirada {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d4523;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 15px;
  width: 100%;
  margin-bottom: 20px;
  gap: 8px;
}

.icone-retirada {
  width: 20px;
  height: 20px;
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
  padding: 1.7rem 0;
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
  padding: 2rem 0;
  font-weight: 500;
  font-size: 1.1rem;
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
