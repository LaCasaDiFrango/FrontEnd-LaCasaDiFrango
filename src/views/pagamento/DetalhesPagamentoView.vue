<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { BackButton } from '@/components/index'

const paymentMethods = [
  { name: 'PIX', image: new URL('@/assets/img/qrcode.svg', import.meta.url).href },
  { name: 'CRÉDITO', image: new URL('@/assets/img/cartao-de-credito.png', import.meta.url).href },
  { name: 'DÉBITO', image: new URL('@/assets/img/cartao-de-credito.png', import.meta.url).href },
]

const selectedIndex = ref(0)
const selectedMethod = ref(paymentMethods[0])

const botoesContainer = ref(null)
const barraIndicadora = ref(null)

const selectMethod = (method, index) => {
  selectedMethod.value = method
  selectedIndex.value = index

  nextTick(updateBarPosition)
}

const updateBarPosition = () => {
  const botoes = botoesContainer.value?.querySelectorAll('button')
  const botao = botoes?.[selectedIndex.value]

  if (botao && barraIndicadora.value) {
    const offsetLeft = botao.offsetLeft
    const width = botao.offsetWidth

    barraIndicadora.value.style.transform = `translateX(${offsetLeft}px)`
    barraIndicadora.value.style.width = `${width}px`
  }
}

onMounted(() => {
  nextTick(updateBarPosition)
})

const total = 55.0
</script>

<template>
  <div class="pagamento-container">
    <BackButton />
    <h2>Detalhes do pagamento</h2>

    <div class="retirada-card">
      <img src="@/assets/img/logo.png" class="retirada-icon" alt="logo" />
      <div class="retirada-texto">
        <span class="retirada-title">Retirar em</span>
        <span class="retirada-endereco">R. Santa Catarina, 683 - Floresta, Joinville - SC</span>
      </div>
    </div>

    <h2 class="pagamento-titulo">Formas de pagamento</h2>

    <div class="botoes-pagamento" ref="botoesContainer">
      <button
        v-for="(method, index) in paymentMethods"
        :key="method.name"
        @click="selectMethod(method, index)"
        :class="{ active: selectedIndex === index }"
      >
        <img :src="method.image" :alt="method.name" />
        {{ method.name }}
      </button>
      <div class="barra-indicadora" ref="barraIndicadora"></div>
    </div>

    <button class="botao-retirada" @click="selectMethod({ name: 'RETIRADA' }, -1)">
      <img src="@/assets/img/wallet.png" class="icone-retirada" alt="ícone" />
      Pagar na retirada
    </button>

    <div class="cartoes">
      <div class="cartao-linha" v-for="n in 2" :key="n">
        <img src="@/assets/img/cartao-de-credito.png" class="cartao-icon" />
        <span>VISA****9032</span>
      </div>
    </div>

    <div class="footer">
      <div class="total">
        <p>Total</p>
        <p>R$ {{ Number(total).toFixed(2).replace('.', ',') }}</p>
      </div>
      <div class="botoes">
        <button class="botao-verde">Finalizar</button>
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.botoes-pagamento {
  display: flex;
  position: relative;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
}

.botoes-pagamento button {
  border: 1.5px solid transparent;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  border-radius: 12px;
  transition: 0.5s all ease-in-out;
}

.botoes-pagamento button.active {
  border-color: #1d4523;
}

.barra-indicadora {
  position: absolute;
  bottom: -2px;
  height: 3px;
  background-color: #1d4523;
  transition: transform 0.3s ease, width 0.3s ease;
  border-radius: 2px;
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
