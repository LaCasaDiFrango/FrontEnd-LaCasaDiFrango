<script setup>
import { ref, nextTick, watch } from 'vue' // Adicione 'watch'
import { useProdutosStore, useToastStore } from '@/stores/index'

const produtosStore = useProdutosStore()
const toast = useToastStore()

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
// Esta 'ref' será usada pelo v-model no input.
const valorInput = ref('')

// 1. REMOVA O 'watch'. Ele não é mais necessário com esta abordagem.

// 2. MODIFIQUE a função que ATIVA a edição
function ativarEdicaoPreco() {
  // Quando a edição começa, copie o valor atual da prop para a ref do input.
  valorInput.value = props.preco
  editandoPreco.value = true

  nextTick(() => {
    document.querySelector(`.preco-input-${props.id}`)?.focus()
  })
}

// 3. MODIFIQUE a função que SALVA
async function salvarPreco() {
  editandoPreco.value = false
  
  if (valorInput.value !== props.preco) {
    try {
      // Envia a atualização para o store e para a API
      await produtosStore.atualizarPreco(props.id, valorInput.value)
      
      console.log('Preço atualizado com sucesso! Recarregando a página...');
      
      // *** AQUI ESTÁ A LINHA QUE FAZ A MÁGICA ***
      // Força o recarregamento completo da página.
      location.reload();

    } catch (err) {
      console.error('Erro ao atualizar preço:', err)
      // Se der erro, podemos alertar o usuário
      alert('Ocorreu um erro ao salvar o preço. Tente novamente.');
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
        <img src="@/assets/img/minus.png" alt="menos" />
        {{ quantidade }}
        <img src="@/assets/img/plus.png" alt="mais" />
      </span>

      <span v-if="mostrarPreco && preco !== null">
        <!-- 
    Se NÃO estiver editando, mostre o valor da prop 'preco'.
    Isso garante que o valor formatado ("13,90") seja sempre exibido.
  -->
        <span v-if="!editandoPreco" class="preco-display">R$ {{ props.preco }}</span>

        <!-- 
    O input só é renderizado quando estamos editando.
    Ele usa 'valorInput' para o v-model, que é uma variável separada.
  -->
        <input v-if="editandoPreco" :class="`preco-input preco-input-${props.id}`" type="text"
        v-model="valorInput" @blur="salvarPreco" @keyup.enter="salvarPreco"
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
.cardapioItem {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
}
.imgProduto {
  width: 150px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.itemInfo {
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: flex-start;
}
.itemInfo h4 {
  font-size: 18px;
  color: #333;
}
.itemInfo span {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}
.itemInfo span img {
  width: 28px;
  cursor: pointer;
}
.preco-input {
  width: 80px;
  text-align: start;
  font-weight: 700;
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 2px 5px;
  border-radius: 8px;
}
.edit-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
