<script setup>
import { ref, nextTick } from 'vue'
import { useProdutosStore } from '@/stores/index'

const produtosStore = useProdutosStore()

const props = defineProps({
  id: [Number, String],
  nome: String,
  quantidade: { type: [Number, String], default: null },
  image: String,
  preco: { type: [Number, String], default: null },
  mostrarQuantidade: { type: Boolean, default: true },
  mostrarPreco: { type: Boolean, default: true },
})

const editandoPreco = ref(false)
const precoEditavel = ref(props.preco)

function ativarEdicaoPreco() {
  editandoPreco.value = true
  nextTick(() => {
    document.querySelector(`.preco-input-${props.id}`)?.focus()
  })
}

async function salvarPreco() {
  editandoPreco.value = false
  if (precoEditavel.value !== props.preco) {
    try {
      await produtosStore.atualizarPreco(props.id, precoEditavel.value)
      console.log('Preço atualizado com sucesso!')
    } catch (err) {
      console.error('Erro ao atualizar preço:', err)
      precoEditavel.value = props.preco // reset
    }
  }
}
</script>

<template>
  <div class="cardapioItem">
    <img class="imgProduto" :src="image" :alt="nome" />
    <div class="itemInfo">
      <h4>{{ nome }}</h4>

      <span v-if="mostrarQuantidade && quantidade !== null">
        <img src="@/assets/img/minus.png" alt="menos">
        {{ quantidade }}
        <img src="@/assets/img/plus.png" alt="mais">
      </span>

      <span v-if="mostrarPreco && preco !== null">
        <input
          :class="`preco-input preco-input-${props.id}`"
          type="text"
          v-model.number="precoEditavel"
          :disabled="!editandoPreco"
          @blur="salvarPreco"
        />
        <img
          src="@/assets/img/icons/edit-black.svg"
          alt="Editar"
          class="edit-icon"
          @click="ativarEdicaoPreco"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.cardapioItem { display: flex; align-items: center; gap: 10px; padding: 20px; }
.imgProduto { width: 150px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.itemInfo { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
.itemInfo h4 { font-size: 18px; color: #333; }
.itemInfo span { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.itemInfo span img { width: 28px; cursor: pointer; }
.preco-input { width: 80px; text-align: start; font-weight: 700; border: none; background: transparent; font-size: 15px; padding: 2px 5px; border-radius: 8px; }
.edit-icon { width: 20px; height: 20px; cursor: pointer; }
</style>
