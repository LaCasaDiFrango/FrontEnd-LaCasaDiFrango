<template>
  <!-- nao funciona :( -->
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Usuários > Cadastrar Usuário"
        subtitle="Cadastre um novo usuário no sistema"
      />

      <div class="flex w-full flex-col justify-center gap-4 bg-white rounded-2xl shadow-md p-5">
        <InputStringAdmin label="Email" placeholder="Email do usuário" @action="(v) => email = v" />
        <InputStringAdmin label="Usuário" placeholder="Nome do usuário" @action="(v) => name = v" />
        <InputImageAdmin @action="(v) => image = v" />
        <InputSelectAdmin
          label="Tipo de Usuário"
          :options="[
            { label: 'Administrador', value: 'administrador' },
            { label: 'Usuário', value: 'usuario' }
          ]"
          placeholder="Selecione o tipo de usuário"
          @action="(v) => perfil = v"
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
import { NavLateralAdmin, TitleAdmin, InputStringAdmin, InputImageAdmin, InputSelectAdmin, ButtonCadastroAdmin } from '@/components/index'
import { useUsuariosStore, useToastStore } from '@/stores/index'

const usuariosStore = useUsuariosStore()
const toast = useToastStore()

const email = ref('')
const name = ref('')
const perfil = ref('')
const image = ref(null)

const handleCadastro = async () => {
  try {
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('name', name.value)
    formData.append('perfil', perfil.value)
    if (image.value) formData.append('imagem', image.value)

    await usuariosStore.cadastrarUsuario(formData)
    toast.success('Usuário cadastrado com sucesso!')

    // Reset campos
    email.value = name.value = perfil.value = ''
    image.value = null
  } catch (err) {
    console.error(err)
    toast.error('Erro ao cadastrar usuário.')
  }
}
</script>
