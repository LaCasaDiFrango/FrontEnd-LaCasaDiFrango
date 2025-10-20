<script setup>
import { ref, watch } from 'vue'
import { useCarrinhoStore } from '@/stores/admin/carrinhoStore'

const props = defineProps({
  id: [Number, String],
  nome: String,
  image: String,
  preco: {
    type: [Number, String],
    default: 0,
  },
})

const carrinhoStore = useCarrinhoStore()
const quantidade = ref(0)
const precoNumber = ref(parseFloat(String(props.preco).replace(',', '.')) || 0)

watch(
  () => props.preco,
  (novo) => {
    precoNumber.value = parseFloat(String(novo).replace(',', '.')) || 0
  }
)

function adicionar() {
  quantidade.value++
  atualizarCarrinho()
}

function remover() {
  if (quantidade.value > 0) {
    quantidade.value--
    atualizarCarrinho()
  }
}

function atualizarCarrinho() {
  carrinhoStore.adicionarProduto({
    id: props.id,
    nome: props.nome,
    preco: precoNumber.value,
    quantidade: quantidade.value,
  })
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <!-- Card do produto -->
    <div
      class="bg-white rounded-2xl shadow-md p-4 w-80 flex flex-col items-center"
    >
      <!-- Imagem -->
      <img
        :src="image"
        :alt="nome"
        class="w-40 h-40 object-cover rounded-xl"
      />

      <!-- Informações -->
      <h4 class="text-base font-semibold text-gray-800 mt-2 text-center line-clamp-2">
        {{ nome }}
      </h4>
      <p class="text-gray-800 font-bold mt-1">
        R$ {{ precoNumber.toFixed(2).replace('.', ',') }}
      </p>

      <!-- Controles embaixo do preço -->
      <div class="flex items-center gap-3 mt-2">
        <button
          @click="remover"
          class="bg-black text-white w-8 h-8 rounded-full text-lg font-bold flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          −
        </button>

        <span class="font-bold text-lg w-6 text-center">
          {{ quantidade }}
        </span>

        <button
          @click="adicionar"
          class="bg-black text-white w-8 h-8 rounded-full text-lg font-bold flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
