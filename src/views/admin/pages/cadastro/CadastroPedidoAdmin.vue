<template>
  <div class="flex">
    <NavLateralAdmin />
    <ResumoButton />
    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Pedidos > Cadastrar Pedido"
        subtitle="Adicionar produtos ao pedido do cliente"
      />
      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] flex-col gap-6 justify-between items-center">
          <!-- Carrossel -->
          <CategoryCarrocelAdmin @categoria-selecionada="selecionarCategoria" />

          <!-- Conteúdo Dinâmico -->
          <div v-if="!categoriaSelecionada" class="text-center text-gray-500 mt-6">
            Clique em uma categoria para selecionar os produtos.
          </div>

          <CategoryBoxAdmin
            v-else
            :categoryName="categoriaSelecionada.categoryName"
            :items="categoriaSelecionada.items"
            :id="slugify(categoriaSelecionada.categoryName)"
            :mostrarQuantidade="true"
            :mostrarPreco="true"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <router-link
          v-if="carrinhoStore && carrinhoStore.itens"
          :to="{
            name: 'Finalizar Pedido',
            params: {
              itens: carrinhoStore.itens,
              total: carrinhoStore.total,
            },
          }"
          class="w-64"
        >
          <ButtonCadastroAdmin label="Finalizar Pedido" class="w-full text-center" />
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NavLateralAdmin,
  TitleAdmin,
  CategoryCarrocelAdmin,
  CategoryBoxAdmin,
  ButtonCadastroAdmin,
  ResumoButton,
} from '@/components/index'

import { useCardapioStore, useUiStore } from '@/stores'
import { useCarrinhoStore } from '@/stores/admin/carrinhoStore'

const cardapioStore = useCardapioStore()
const ui = useUiStore()
const carrinhoStore = useCarrinhoStore()

const categoriaSelecionada = ref(null)

onMounted(async () => {
  ui.showLoading()
  try {
    await cardapioStore.fetchProdutos()
  } finally {
    ui.hideLoading()
  }
})

const selecionarCategoria = (label) => {
  console.log('Label clicado:', label)
  console.log(
    'Categorias disponíveis:',
    cardapioStore.categories.map((c) => c.categoryName),
  )

  categoriaSelecionada.value = cardapioStore.categories.find((cat) => cat.categoryName === label)

  console.log('Categoria encontrada:', categoriaSelecionada.value)
}

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
</script>

<style scoped></style>
