<script setup>
import { ref, watch } from 'vue'
import { useProdutosStore, useToastStore } from '@/stores/index'

const produtosStore = useProdutosStore()
const toast = useToastStore()

const props = defineProps({
  id: [Number, String],
  nome: String,
  quantidade: { type: [Number, String], default: 0 },
  image: String,
  preco: { type: [Number, String], default: null },
  mostrarQuantidade: { type: Boolean, default: true },
  mostrarPreco: { type: Boolean, default: true },
})

// ======== ESTADOS ========
const editandoPreco = ref(false)
const valorInputPreco = ref('')
const stagedQuantidade = ref(0)
const aguardandoConfirmacaoQtd = ref(false)
const aguardandoConfirmacaoPreco = ref(false)

// Atualiza quantidade inicial
watch(
  () => props.quantidade,
  (newVal) => (stagedQuantidade.value = parseInt(newVal, 10)),
  { immediate: true }
)

// ======== FUNÇÕES DE PREÇO ========
function ativarEdicaoPreco() {
  valorInputPreco.value = props.preco
  editandoPreco.value = true
  aguardandoConfirmacaoPreco.value = true
}

async function confirmarPreco() {
  if (valorInputPreco.value !== props.preco) {
    try {
      await produtosStore.atualizarPreco(props.id, valorInputPreco.value)
       location.reload();
      toast.success('Preço atualizado com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao salvar o preço.')
    }
  }
  editandoPreco.value = false
  aguardandoConfirmacaoPreco.value = false
}

function cancelarPreco() {
  editandoPreco.value = false
  aguardandoConfirmacaoPreco.value = false
  valorInputPreco.value = props.preco
}

// ======== FUNÇÕES DE QUANTIDADE ========
function handleAjusteVisual(ajuste) {
  stagedQuantidade.value = Math.max(0, stagedQuantidade.value + ajuste)
  aguardandoConfirmacaoQtd.value = true
}

async function confirmarQuantidade() {
  const diferenca = stagedQuantidade.value - parseInt(props.quantidade, 10)
  aguardandoConfirmacaoQtd.value = false

  if (diferenca === 0) return

  try {
    await produtosStore.ajustarQuantidade(props.id, diferenca)
    toast.success('Quantidade ajustada com sucesso!')
  } catch (err) {
    console.error('Erro ao ajustar quantidade:', err)
    toast.error('Erro ao ajustar quantidade.')
  }
}

function cancelarQuantidade() {
  aguardandoConfirmacaoQtd.value = false
  stagedQuantidade.value = parseInt(props.quantidade, 10)
}
</script>

<template>
  <div class="cardapioItem">
    <img class="imgProduto" :src="image" :alt="nome" />

    <div class="itemInfo">
      <h4>{{ nome }}</h4>

      <!-- QUANTIDADE -->
      <div v-if="mostrarQuantidade" class="quantidade-wrapper">
        <div class="quantidade-controls">
          <img
            src="@/assets/img/minus.png"
            alt="menos"
            class="quantidade-icon"
            @click="handleAjusteVisual(-1)"
          />
          <span>Qtd: {{ stagedQuantidade }}</span>
          <img
            src="@/assets/img/plus.png"
            alt="mais"
            class="quantidade-icon"
            @click="handleAjusteVisual(1)"
          />
        </div>

        <!-- Botões de confirmação (abaixo) -->
        <transition name="fade">
          <div
            v-if="aguardandoConfirmacaoQtd"
            class="confirmacao-botoes"
          >
            <button @click="confirmarQuantidade" class="btn-confirmar">Confirmar</button>
            <button @click="cancelarQuantidade" class="btn-cancelar">Cancelar</button>
          </div>
        </transition>
      </div>

      <!-- PREÇO -->
      <div v-if="mostrarPreco" class="preco-wrapper">
        <div class="preco-controls">
          <template v-if="!editandoPreco">
            <span>R$ {{ props.preco }}</span>
            <img
              src="@/assets/img/icons/edit-black.svg"
              alt="Editar Preço"
              class="edit-icon"
              @click="ativarEdicaoPreco"
            />
          </template>

          <template v-else>
            <input
              :class="`preco-input preco-input-${props.id}`"
              type="text"
              v-model="valorInputPreco"
            />
          </template>
        </div>

        <!-- Botões de confirmação do preço (abaixo do input) -->
        <transition name="fade">
          <div
            v-if="aguardandoConfirmacaoPreco"
            class="confirmacao-botoes"
          >
            <button @click="confirmarPreco" class="btn-confirmar">Confirmar</button>
            <button @click="cancelarPreco" class="btn-cancelar">Cancelar</button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardapioItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* garante que o conteúdo preencha igualmente */
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  height: 100%;
  min-height: 270px; /* altura mínima consistente */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.cardapioItem:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.imgProduto {
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}


.itemInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.quantidade-wrapper,
.preco-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quantidade-controls,
.preco-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantidade-icon,
.edit-icon {
  cursor: pointer;
  width: 22px;
  height: 22px;
  transition: transform 0.2s;
}

.quantidade-icon:hover,
.edit-icon:hover {
  transform: scale(1.1);
}

.preco-input {
  width: 70px;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
  text-align: center;
}

.confirmacao-botoes {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.btn-confirmar {
  background-color: #4caf50;
  color: white;
  padding: 3px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
}

.btn-cancelar {
  background-color: #f44336;
  color: white;
  padding: 3px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
