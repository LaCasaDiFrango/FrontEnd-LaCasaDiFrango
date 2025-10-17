<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: [Number, String],
  nome: String,
  quantidade: String,
  image: String,
  imgAlt: String,
})

const router = useRouter()

function irParaDetalhe() {
  router.push(`/home/produtos/${props.id}`)
}
</script>

<template>
  <div class="cardapioItem" @click="irParaDetalhe">
    <img :src="image" :alt="nome" />
    <div class="itemInfo">
      <h4>{{ nome }}</h4>
      <span>{{ quantidade }}</span>
    </div>
  </div>
</template>

<style scoped>
.cardapioItem {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 200px;
}

.cardapioItem img {
  width: 100px;
  height: auto;
  border-radius: 8px;
}

.itemInfo {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.itemInfo h4 {
  font-size: 18px;
  color: #333;
}

.itemInfo span {
  font-size: 15px;
  color: #000;
  font-weight: 700;
}
</style>
