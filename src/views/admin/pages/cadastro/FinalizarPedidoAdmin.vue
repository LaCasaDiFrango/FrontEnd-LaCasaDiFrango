<template>
  <div class="flex min-h-screen bg-gray-50">
    <NavLateralAdmin />

    <main class="flex-1 p-10 overflow-auto">
      <TitleAdmin
        title="Pedidos > Escolher Categoria produto > Finalizar Pedido"
        subtitle="Verifique as informações antes de confirmar o pedido"
      />

      <!-- Container dos Inputs e Resumo -->
      <div class="max-w-4xl mx-auto mt-12 space-y-8">
        <!-- Dados do Cliente -->
        <div class="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-8">Dados do Cliente</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="Email do cliente"
                class="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Usuário</label>
              <input
                v-model="usuario"
                type="text"
                placeholder="Nome do cliente"
                class="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="bg-gray-100 p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Resumo do Pedido</h2>

          <ul class="text-gray-700 text-left space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-2">
            <li
              v-for="item in carrinhoStore.itens"
              :key="item.id"
              class="flex justify-between border-b border-gray-200 pb-2"
            >
              <span><strong>{{ item.quantidade }}</strong> {{ item.nome }}</span>
              <span class="font-medium">R${{ (item.preco * item.quantidade).toFixed(2) }}</span>
            </li>
          </ul>

          <div class="flex justify-between text-lg font-semibold border-t pt-4">
            <span>Total:</span>
            <span class="text-2xl font-bold text-gray-900">R${{ carrinhoStore.total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Botão Finalizar -->
        <div class="text-center">
          <button
            @click="finalizarPedido"
            class="mt-4 bg-black text-white px-10 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105 shadow-md"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCarrinhoStore } from '@/stores/admin/carrinhoStore'
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

const carrinhoStore = useCarrinhoStore()
const email = ref('')
const usuario = ref('')

function finalizarPedido() {
  if (!email.value || !usuario.value) {
    alert('Preencha os dados do cliente antes de finalizar!')
    return
  }

  alert(`Pedido finalizado para ${usuario.value} (${email.value}). Total: R$${carrinhoStore.total.toFixed(2)}`)
}
</script>
