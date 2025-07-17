<script setup>
import { ref, computed } from 'vue'
import { BackButton } from '@/components/index'
import imgFrango from '@/assets/img/chicken-leg.png'

const quantidade = ref(1)
const precoUnitario = 55
const total = computed(() => quantidade.value * precoUnitario)

const incrementar = () => quantidade.value++
const decrementar = () => {
  if (quantidade.value > 1) quantidade.value--
}
</script>

<template>
  <div class="pedido-container">
    <!-- Header -->
    <BackButton />
    <h2>Meu Pedido</h2>

    <!-- Item selecionado -->
    <div class="item-selecionado">
      <div class="item-img">
      <img :src="imgFrango" alt="Frango" class="item-img" />
      </div>
      <div class="item-info">
        <p class="item-nome">Frango assado sem recheio</p>
        <p class="preco">R${{ precoUnitario.toFixed(2) }}</p>
      </div>
      <div class="quantidade-controles">
        <button @click="decrementar">-</button>
        <span>{{ quantidade }}</span>
        <button @click="incrementar">+</button>
      </div>
    </div>

    <!-- Total e botões -->
    <div class="footer">
      <div class="total">
        <p>Total</p>
        <p>R${{ total.toFixed(2) }}</p>
      </div>

      <div class="botoes">
        <button class="botao-claro">Adicionar Produtos</button>
        <button class="botao-verde">Finalizar</button>
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
  align-items: start;
  justify-content: space-around;
  flex-direction: column;
}

.item-img {
  width: 48px;
  height: 48px;
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
