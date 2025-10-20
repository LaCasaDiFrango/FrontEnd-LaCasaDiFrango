<template>
  <div class="flex min-h-screen bg-gray-50">
    <NavLateralAdmin />

    <main class="flex-1 p-10 overflow-auto">
      <TitleAdmin
        title="Pedidos > Escolher Categoria produto > Finalizar Pedido"
        subtitle="Verifique as informações antes de confirmar o pedido"
      />

      <div class="max-w-4xl mx-auto mt-12 space-y-8">
        <!-- Seleção do Cliente -->
        <div class="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-8">Dados do Cliente</h2>

          <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Selecione o Cliente</label>
              <select
                v-model="usuarioSelecionado"
                class="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              >
                <option value="" disabled>Escolha um usuário</option>
                <option
                  v-for="u in usuarios"
                  :key="u.id || u.pk"
                  :value="u.id || u.pk"
                >
                  {{ u.email || u.username }}
                </option>
              </select>
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
            :disabled="carregando"
            class="mt-4 bg-black text-white px-10 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105 shadow-md disabled:opacity-50"
          >
            {{ carregando ? 'Finalizando...' : 'Finalizar Pedido' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCarrinhoStore } from '@/stores/admin/carrinhoStore'
import { NavLateralAdmin, TitleAdmin } from '@/components/index'

const carrinhoStore = useCarrinhoStore()
const usuarios = ref([])
const usuarioSelecionado = ref(null)
const carregando = ref(false)

const API_BASE = import.meta.env.VITE_API_URL 

// Carrega usuários do backend
onMounted(async () => {
  try {
    const response = await axios.get(`${API_BASE}/usuarios/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log('Usuarios carregados:', response.data)
    usuarios.value = response.data
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro.response?.data || erro.message)
    alert('Não foi possível carregar a lista de usuários.')
  }
})

// Finaliza pedido
async function finalizarPedido() {
  if (!usuarioSelecionado.value) {
    alert('Selecione um usuário antes de finalizar!')
    return
  }

  if (carrinhoStore.itens.length === 0) {
    alert('O carrinho está vazio!')
    return
  }

  const pedido = {
    usuario: usuarioSelecionado.value,
    itens: carrinhoStore.itens.map(item => ({
      produto: item.id,
      quantidade: item.quantidade
    }))
  }

  try {
    carregando.value = true
    const resposta = await axios.post(`${API_BASE}/pedidos/`, pedido, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    alert('Pedido cadastrado com sucesso!')
    console.log('Pedido enviado:', resposta.data)
    carrinhoStore.itens = []
    usuarioSelecionado.value = null
  } catch (erro) {
    console.error('Erro ao cadastrar pedido:', erro.response?.data || erro.message)
    alert('Erro ao cadastrar pedido. Verifique se está autenticado e tente novamente.')
  } finally {
    carregando.value = false
  }
}
</script>
