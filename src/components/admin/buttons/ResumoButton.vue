<script setup>
import { ref, computed } from 'vue'
import { useCarrinhoStore } from '@/stores/admin/carrinhoStore'

const carrinhoStore = useCarrinhoStore()
const mostrar = ref(false)

function toggleResumo() {
  mostrar.value = !mostrar.value
}

// ✅ Computed para total de itens no carrinho
const qtdItens = computed(() => {
  return carrinhoStore.itens?.reduce((acc, item) => acc + (item.quantidade || 1), 0) || 0
})
</script>

<template>
  <div class="fixed top-6 right-[calc(1.5rem+70px)] z-50"> <!-- move 70px para esquerda -->
    <!-- Botão com imagem -->
    <button @click="toggleResumo" class="relative p-1 hover:scale-110 transition-transform">
      <img src="@/assets/img/receipt.png" alt="Resumo" class="w-10 h-10" />
      
      <!-- ✅ Badge com número de produtos -->
      <span
        v-if="qtdItens > 0"
        class="absolute top-0 right-0 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[11px] font-bold rounded-full animate-pulse"
      >
        {{ qtdItens }}
      </span>
    </button>

    <!-- Animação do resumo -->
    <transition
      name="slide-down"
      enter-active-class="transition-transform duration-300"
      enter-from-class="-translate-y-20 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-20 opacity-0"
    >
      <div
        v-if="mostrar"
        class="absolute top-14 right-0 bg-white rounded-2xl shadow-xl w-96 p-8 max-h-[800px] overflow-auto" 
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Resumo do Pedido</h2>

        <ul class="divide-y divide-gray-100 mb-4">
          <li
            v-for="item in carrinhoStore.itens"
            :key="item.id"
            class="py-4 flex justify-between items-center text-base font-medium"
          >
            <span>{{ item.quantidade }}x {{ item.nome }}</span>
            <span class="font-bold">
              R${{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}
            </span>
          </li>
        </ul>

        <div class="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span>R${{ carrinhoStore.total.toFixed(2).replace('.', ',') }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 🔥 Animação pulse igual ao nav de pedidos */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 1s infinite;
}
</style>
