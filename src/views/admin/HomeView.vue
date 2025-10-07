<script setup>
import { ref } from 'vue'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
} from '@/components/index'

const nome = ref('')
const nivelEducacao = ref('medio')
const dataAnalise = ref('')
const imagem = ref(null)

const opcoesEducacao = [
  { label: 'Fundamental', value: 'fundamental' },
  { label: 'Médio', value: 'medio' },
  { label: 'Superior', value: 'superior' },
]

const showDropdown = ref(false)

// ações definidas no pai
function adicionarProduto() {
  // aqui pode abrir modal, navegar, chamar API, etc
  console.log('Executando: adicionar produto')
}
function adicionarCliente() {
  console.log('Executando: adicionar cliente')
}

const options = ref([
  { label: 'Adicionar produto', action: adicionarProduto },
  { label: 'Adicionar cliente', action: adicionarCliente }
])

const selectedOption = ref(null) // ou options.value[0] para já ter uma selecionada

function handleAddClick() {
  // toggle do dropdown quando não há opção selecionada
  showDropdown.value = !showDropdown.value
}
</script>

<template>
  <div class="flex">
    <NavLateralAdmin />
    <main class="flex-1 p-6 space-y-6">
      <ButtonActionAdmin
        title="Adicionar"
        :showDropdown="showDropdown"
        :options="options"
        v-model:selectedOption="selectedOption"
        @click="handleAddClick"
      />
            <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputStringAdmin label="Nome" :modelValue="nome" @action="nome = $event"/>

        <InputSelectAdmin label="Nível da educação" :modelValue="nivelEducacao" :options="opcoesEducacao" @action="nivelEducacao = $event"/>

        <InputDateAdmin label="Data de Análise" modelValue="dataAnalise" @action="dataAnalise = $event"/>

        <div class="md:col-span-2">
          <InputImageAdmin label="Imagem" :modelValue="imagem" @action="imagem = $event"/>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>

</style>
