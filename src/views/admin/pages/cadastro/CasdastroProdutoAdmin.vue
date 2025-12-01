<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Estoque > Cadastrar Produto"
        subtitle="Cadastre um novo produto no sistema"
      />

      <div class="flex w-full flex-col justify-center gap-4 bg-white rounded-2xl shadow-md p-5">
        <InputStringAdmin label="Nome" placeholder="Nome do Produto" @action="(v) => (nome = v)" />
        <InputStringAdmin
          label="Descrição"
          placeholder="Descrição do Produto"
          @action="(v) => (descricao = v)"
        />
        <InputImageAdmin @action="(v) => (imagem = v)" />
        <div class="flex w-full gap-4">
          <div class="flex-1">
            <InputStringAdmin
              label="Preço"
              placeholder="Preço do Produto"
              @action="(v) => (preco = v)"
            />
          </div>
          <div class="flex-1">
            <InputStringAdmin
              label="Quantidade em Estoque"
              placeholder="Quantidade em Estoque"
              @action="(v) => (quantidade_em_estoque = v)"
            />
          </div>
        </div>

        <InputSelectAdmin
          label="Categoria do Produto"
          :options="[
            { label: 'Frango', value: 1 },
            { label: 'Maionese', value: 2 },
            { label: 'Costela', value: 3 },
            { label: 'Bebida', value: 4 },
            { label: 'Conserva', value: 5 },
            { label: 'Farofa', value: 6 },
          ]"
          placeholder="Selecione a categoria do produto"
          @action="(v) => (categoria = v)"
        />

        <div class="w-full flex justify-center items-center">
          <ButtonCadastroAdmin label="Cadastrar" @click="handleCadastro" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  NavLateralAdmin,
  TitleAdmin,
  InputStringAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  ButtonCadastroAdmin,
} from '@/components/index'
import { useProdutosStore, useToastStore } from '@/stores/index'
import router from '@/router'

const produtosStore = useProdutosStore()
const toast = useToastStore()

// campos
const nome = ref('')
const descricao = ref('')
const preco = ref('')
const quantidade_em_estoque = ref('')
const categoria = ref('')
const imagem = ref(null)

const handleCadastro = async () => {
  try {
    const formData = new FormData()
    formData.append('nome', nome.value)
    formData.append('descricao', descricao.value)
    formData.append('preco', parseFloat(preco.value))
    formData.append('quantidade_em_estoque', parseInt(quantidade_em_estoque.value))
    formData.append('categoria', categoria.value)
    if (imagem.value) {
      formData.append('imagem', imagem.value)
    }

    await produtosStore.cadastrarProduto(formData)

    toast.success('Produto cadastrado com sucesso!')
    router.push('/dashboard/estoque')
    console.log('🧾 Dados a enviar:', {
  nome: nome.value,
  descricao: descricao.value,
  preco: preco.value,
  quantidade_em_estoque: quantidade_em_estoque.value,
  categoria: categoria.value,
  imagem: imagem.value ? imagem.value.name : 'sem imagem',
})

    nome.value = ''
    descricao.value = ''
    preco.value = ''
    quantidade_em_estoque.value = ''
    categoria.value = ''
    imagem.value = null
  } catch (err) {
    console.error(err)
    toast.error('Erro ao cadastrar produto. Verifique os dados.')
  }
}
</script>
