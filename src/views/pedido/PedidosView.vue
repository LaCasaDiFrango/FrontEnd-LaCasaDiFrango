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

// Import SVG do jeito que Vite aceita
import deleteIcon from '@/assets/img/icons/delete.svg'

// Router
const router = useRouter()

// Stores
const pedidoStore = usePedidoStore()
const authStore = useAuthStore()
const ui = useUiStore()
const toast = useToastStore()

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
  return (
    pedidoAtual.value.itens?.reduce((soma, item) => {
      const valor =
        Number(item.total) || Number(item?.produto?.preco) * Number(item?.quantidade) || 0
      return soma + valor
    }, 0) || 0
  )
})

const itensPedidoAtual = computed(() => pedidoAtual.value?.itens || [])

const irParaDetalhes = () => {
  if (pedidoAtual.value?.id) {
    router.push(`/home/perfil/historico-pedidos/detalhes-pedido/${pedidoAtual.value.id}`)
  }
}

// Função para remover item
const removerItem = async (produtoId) => {
  if (!produtoId) return

  try {
    ui.showLoading()
    await pedidoStore.removerItemDoPedido(pedidoAtual.value.id, produtoId)
    await carregarPedidoAtual()
  } catch (err) {
    console.error('Erro ao remover item:', err)
  } finally {
    ui.hideLoading()
  }
}
</script>

<template>
  <div v-if="ui.loading">
    <LoadingPage />
  </div>

  <div v-else class="pedido-container">
    <TitlePages title="Meu Pedido" @click="router.back()" />

    <SemPermission
      v-if="isGuest"
      text="Para adicionar itens no Pedido faça login ou se cadastre!"
    />

    <template v-else-if="isUser">
      <div class="pedidos" v-if="itensPedidoAtual.length > 0">
        <div v-for="item in itensPedidoAtual" :key="item.produto.id" class="item-selecionado">
          <div class="item-info">
            <img :src="item.produto.imagem" alt="Produto" class="item-img" />
            <div class="sub-info">
              <p class="item-nome">{{ item.produto.nome }}</p>
              <p class="preco">R$ {{ Number(item.produto.preco).toFixed(2).replace('.', ',') }}</p>
            </div>
          </div>

          <!-- Quantidade no canto inferior direito -->
          <div class="quantidade-controles">
            <span>Qtd: {{ item.quantidade }}</span>
          </div>

          <!-- Botão delete no topo direito -->
          <button @click="removerItem(item.produto.id)" class="remover-btn">
            <img :src="deleteIcon" alt="Delete" />
          </button>
        </div>
      </div>

      <PedidoSemItens v-else text="Nenhum produto foi adicionado ao seu pedido." />

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

    <SemPermission v-else text="Você não tem permissão para acessar esta página." />
  </div>
</template>

<style scoped>
.pedido-container {
  padding: 14px 50px 0 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

.pedidos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 210px);
}

.item-selecionado {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #000;
  gap: 1rem;
  padding: 1.5rem 1rem 2rem 1rem; /* espaço superior e direito para o botão delete */
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 70px;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-img {
  width: 48px;
  height: 48px;
}

.sub-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-nome {
  font-weight: 500;
  font-size: 1rem;
}

.preco {
  font-weight: 600;
  color: #1d4523;
}

.remover-btn {
  position: relative;
  right: 0;
  background-color: #B91C1C;
  border: none;
  padding: 0.35rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid #fff;
}

.remover-btn img {
  width: 16px;
  height: auto;
}

.quantidade-controles {
  position: absolute;
  bottom: .5rem;
  right: .5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.total {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem;
  font-weight: 600;
  border-top: 1px solid #ccc;
  background-color: #fff;
}

.botoes {
  display: flex;
  justify-content: center;
  width: 100%;
}

.botao-claro,
.botao-verde {
  flex: 1;
  padding: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.botao-claro {
  background-color: #f9f9f9;
  border-top: 2px solid #000;
}

.botao-verde {
  background-color: #1d4523;
  color: #fff;
  border-top: 2px solid #1d4523;
}
</style>
