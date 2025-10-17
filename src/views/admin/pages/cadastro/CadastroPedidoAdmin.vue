<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Pedidos > Cadastrar Pedido"
        subtitle="Alterar as informações de um produto no estoque"
      />
      <div class="flex w-full justify-center items-center">
        <div class="flex flex-[0.9] flex-col gap-6 justify-between items-center">
          <!-- Carrossel -->
          <CategoryCarrocelAdmin @categoria-selecionada="selecionarCategoria" />

          <!-- Conteúdo Dinâmico -->
          <div v-if="!categoriaSelecionada" class="text-center text-gray-500 mt-6">
            Clique em uma categoria para alterar a quantidade em estoque de um produto.
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
<!-- Botão centralizado horizontalmente, mas sem alterar o resto -->
<div class="flex justify-center">
  <ButtonCadastroAdmin label="Finalizar Pedido" class="w-64 text-center" />
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
} from '@/components/index'
import { useCardapioStore, useUiStore } from '@/stores'

const cardapioStore = useCardapioStore()
const ui = useUiStore()

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
    cardapioStore.categories.map((c) => c.categoryName)
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

<style scoped>


</style>
