<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  BackButton,
  SemPermission,
  TitlePages,
  PedidoSemItens,
  LoadingPage,
} from '@/components/index'
import { usePedidoStore, useAuthStore, useUiStore, useToastStore } from '@/stores/index'

// Router
const router = useRouter()

// Stores
const pedidoStore = usePedidoStore()
const authStore = useAuthStore()
const ui = useUiStore() // Loading global
const toast = useToastStore() // Toast global

// Refs do pedido
const { pedidoAtual } = storeToRefs(pedidoStore)
const carregarPedidoAtual = pedidoStore.carregarPedidoAtual

// Refs do usuário
const { isGuest, isUser } = storeToRefs(authStore)

onMounted(async () => {
  if (isUser.value) {
    ui.showLoading()
    try {
      await carregarPedidoAtual()
    } catch (err) {
      console.error('Erro ao carregar pedido:', err)
    } finally {
      ui.hideLoading()
    }
  }
})

const total = computed(() => {
  if (!pedidoAtual.value) return 0
  return pedidoAtual.value.itens?.reduce((soma, item) => {
    const valor =
      Number(item.total) || Number(item?.produto?.preco) * Number(item?.quantidade) || 0
    return soma + valor
  }, 0) || 0
})

const itensPedidoAtual = computed(() => pedidoAtual.value?.itens || [])

const irParaDetalhes = () => {
  if (pedidoAtual.value?.id) {
    router.push(`/home/perfil/historico-pedidos/detalhes-pedido/${pedidoAtual.value.id}`)
  }
}

// Função corrigida para remover item
const removerItem = async (produtoId) => {
  if (!produtoId) return

  try {
    ui.showLoading()

    await pedidoStore.removerItemDoPedido(pedidoAtual.value.id, produtoId)

    // Atualiza o pedido na tela
    await carregarPedidoAtual()

    // ✅ usa toast da store de toast
    toast.success('Item removido com sucesso!')
  } catch (err) {
    console.error('Erro ao remover item:', err)
    toast.error('Erro ao remover item. Tente novamente.')
  } finally {
    ui.hideLoading()
  }
}
</script>


<template>
  <!-- Loading global -->
  <div v-if="ui.loading">
    <LoadingPage />
  </div>

  <div v-else class="pedido-container">
    <TitlePages title="Meu Pedido" @click="router.back()" />

    <!-- Convidado -->
    <SemPermission
      v-if="isGuest"
      text="Para adicionar itens no Pedido faça login ou se cadastre!"
    />

    <!-- Usuário autenticado -->
    <template v-else-if="isUser">
      <!-- Se tiver itens -->
      <div class="pedidos" v-if="itensPedidoAtual.length > 0">
        <div v-for="item in itensPedidoAtual" :key="item.produto.id" class="item-selecionado">
          <div class="item-info">
            <img :src="item.produto.imagem" alt="Produto" class="item-img" />
            <div class="sub-info">
              <p class="item-nome">{{ item.produto.nome }}</p>
              <p class="preco">R$ {{ Number(item.produto.preco).toFixed(2).replace('.', ',') }}</p>
            </div>
          </div>
          <div class="quantidade-controles">
            <span>Qtd: {{ item.quantidade }}</span>
                <button @click="removerItem(item.produto.id)" class="remover-btn">🗑</button>
          </div>
        </div>
      </div>

      <!-- Pedido vazio -->
      <PedidoSemItens v-else text="Nenhum produto foi adicionado ao seu pedido." />

      <!-- Footer -->
      <div class="footer">
        <div class="total">
          <p>Total</p>
          <p>R$ {{ Number(total).toFixed(2).replace('.', ',') }}</p>
        </div>
        <div class="botoes">
          <button class="botao-claro" @click="router.push('/home/produtos')">
            Adicionar Produtos
          </button>
          <button
            class="botao-verde"
            :disabled="!pedidoAtual || !pedidoAtual.id"
            @click="irParaDetalhes"
          >
            Próxima Etapa
          </button>
        </div>
      </div>
    </template>

    <!-- Outros perfis -->
    <SemPermission v-else text="Você não tem permissão para acessar esta página." />
  </div>
</template>

<style scoped>
.pedido-container {
  padding: 14px 50px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  justify-content: start;
  height: 100vh; /* ocupa a tela toda */
  overflow: hidden; /* impede scroll na página */
  box-sizing: border-box;
}

.pedidos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow-y: auto; /* só aqui pode rolar */
  max-height: calc(100vh - 210px); /* ajusta p/ caber o footer e o título */
}

.item-selecionado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.item-img {
  width: 48px;
  height: 48px;
}

.sub-info {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.25rem;
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
  color: #1d4523;
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
  background-color: #fff;
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
  background-color: #1d4523;
  border-top: 2px solid #1d4523;
  color: white;
}
</style>
