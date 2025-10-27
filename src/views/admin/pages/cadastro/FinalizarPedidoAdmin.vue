<template>
  <div class="flex min-h-screen bg-gray-50">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Pedidos > Cadastrar Pedido > Finalizar Pedido"
        subtitle="Verifique as informações antes de confirmar o pedido"
      />

      <div class="max-w-4xl mx-auto mt-12 space-y-8">
        <!-- Seleção de Usuário -->
        <div class="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-800 mb-8">Dados do Cliente</h2>

          <div class="grid grid-cols-1 gap-6">
            <SelectClienteAdmin v-model:selected="usuarioSelecionado" />

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Identificador (opcional)</label
              >
              <input
                v-model="identificador"
                placeholder="Ex: Mesa 3, Cliente João..."
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
              <span
                ><strong>{{ item.quantidade }}</strong> {{ item.nome }}</span
              >
              <span class="font-medium">R${{ (item.preco * item.quantidade).toFixed(2) }}</span>
            </li>
          </ul>

          <div class="flex justify-between text-lg font-semibold border-t pt-4">
            <span>Total:</span>
            <span class="text-2xl font-bold text-gray-900"
              >R${{ carrinhoStore.total.toFixed(2) }}</span
            >
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
import { useCarrinhoStore } from '@/stores/admin/carrinhoStore'
import { useToastStore } from '@/stores/index'
import { pedido } from '@/api/index'
import UserService from '@/api/usuario/user'
import { NavLateralAdmin, TitleAdmin, SelectClienteAdmin } from '@/components/index'

const carrinhoStore = useCarrinhoStore()
const toast = useToastStore()
const carregando = ref(false)
const usuarios = ref([])
const usuarioSelecionado = ref(null)

const pedidoService = new pedido.default()
const userService = new UserService()

async function buscarUsuarios() {
  try {
    const response = await userService.getAll()
    const data = response.data || response // garante compatibilidade
    console.log('[DEBUG] Retorno getAll corrigido:', data)

    // Corrige de acordo com o formato
    usuarios.value = data.results || data
    console.log('[DEBUG] Usuários carregados:', usuarios.value)
  } catch (erro) {
    console.error('Erro ao carregar usuários:', erro.response?.data || erro.message)
    toast.error('Falha ao carregar usuários')
  }
}

onMounted(() => {
  buscarUsuarios()
})

const identificador = ref('')

async function finalizarPedido() {
  if (carrinhoStore.itens.length === 0) {
    toast.info('O carrinho está vazio!')
    return
  }

const pedidoData = {
  usuario: usuarioSelecionado.value?.id,
  identificador: identificador.value?.trim() || undefined,
  status: 4,
  itens: carrinhoStore.itens.map((item) => ({
    produto: item.id,
    quantidade: item.quantidade,
  })),
}


  try {
    carregando.value = true
    const resposta = await pedidoService.create(pedidoData)
    toast.success(`Pedido criado com sucesso! ${resposta.identificador || ''}`)
    carrinhoStore.itens = []
    usuarioSelecionado.value = null
    identificador.value = ''
  } catch (erro) {
    console.error('Erro ao cadastrar pedido:', erro.response?.data || erro.message)
    toast.error('Erro ao cadastrar pedido. Verifique os dados e tente novamente.')
  } finally {
    carregando.value = false
  }
}
</script>