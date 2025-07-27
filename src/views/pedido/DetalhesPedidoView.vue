<script setup>
import { useRouter } from 'vue-router'
import {BackButton} from '@/components/index'

const router = useRouter()
const pedido = {
  codigo: '3frd',
  status: 'Entregue',
  data: '13/07/2025',
  itens: [
    {
      nome: 'Frango assado sem recheio',
      quantidade: 1,
      preco: 55.0
    }
  ],
  total: 55.0
}
</script>

<template>
  <div class="pedido-detalhes">
    <BackButton />
    <h2>Pedido</h2>

    <div class="status-container">
      <img src="@/assets/img/chicken-leg.png" alt="Frango" class="icone" />
      <div class="status-info">
        <p :class="['status', pedido.status.toLowerCase()]">{{ pedido.status }}</p>
        <p class="data">{{ pedido.data }}</p>
      </div>
      <p class="codigo"><strong>Pedido #{{ pedido.codigo }}</strong></p>
    </div>

    <div class="pedido-itens">
      <h3>Seu Pedido</h3>
      <div v-for="item in pedido.itens" :key="item.nome" class="item">
        <p><strong>{{ item.quantidade }}</strong> {{ item.nome }}</p>
        <p class="preco">R${{ item.preco.toFixed(2).replace('.', ',') }}</p>
      </div>
    </div>

    <div class="total">
      <p class="label">Total</p>
      <p class="valor">R${{ pedido.total.toFixed(2).replace('.', ',') }}</p>
    </div>

    <div class="comentario">
      <label for="comentario">Algum comentário?</label>
      <textarea id="comentario" rows="3" placeholder="Digite aqui..."></textarea>
      <button class="icone-chat"><img src="@/assets/img/chat.svg" alt="Chat"></button>
    </div>

    <div class="ajuda">
      <p>Precisa de Ajuda?</p>
      <a href="https://wa.me/5599999999999" target="_blank">
        <div class="whatsapp">
        <img src="@/assets/img/whatsapp.svg" alt="WhatsApp" />
        <span>Whatsapp</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.pedido-detalhes {
  padding: 14px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: center;
}

h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.status-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
    width: 100%;
}

.icone {
  width: 40px;
  height: 40px;
}

.status-info {
  flex: 1;
}

.status {
  font-size: 16px;
  font-weight: bold;
}

.status.entregue {
  color: green;
}

.status.cancelado {
  color: #b30000;
}

.data {
  font-size: 12px;
  color: #777;
}

.codigo {
  font-size: 14px;
}

.pedido-itens {
  width: 100%;
  display: flex;
  justify-content: center;
    flex-direction: column;
    gap: 10px;
    align-items: start;
}

.pedido-itens h3 {
  font-size: 20px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: column;
  gap: 10px;
}

.preco {
  font-weight: bold;
}

.total {
  padding: 40px 20px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-itens: center;
    width: 100%;
  font-weight: bold;
  font-size: 18px;
}

.label {
  font-size: 23px;
}

.valor {
  font-size: 23px;
}

.comentario {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.comentario label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

textarea {
  width: 100%;
  height: 100%;
  padding: 16px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
}

.icone-chat {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -5px;
  bottom: -5px;
  background: #fff;
  border-radius: 12px;
    border: 1px solid #ccc;
  padding: 5px;
  cursor: pointer;
}

.icone-chat img {
    width: 20px;
    height: 20px;
}

.ajuda {
  text-align: center;
  display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: bold;
    justify-content: center;
    width: 100%;
}

.whatsapp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #029438;
    text-decoration: none;
    font-weight: bold;
}

.whatsapp img{
    width: 30px;
    height: 30px;
}
</style>
