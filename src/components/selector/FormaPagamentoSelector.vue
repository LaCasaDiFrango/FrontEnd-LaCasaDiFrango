<script setup>
import { ref, onMounted, nextTick } from 'vue'
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

</script>
<template>
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
</template>
<style scoped>
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

.botoes-pagamento button img{
  width: 40px;
  height: auto;
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
</style>