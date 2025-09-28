<template>
  <div class="form-page">
    <BackButton @click="$router.back()" />

    <form class="form">
      <!-- Nome: mostra o nome atual ou "Nome" -->
      <InputForm label="Nome" v-model="name" />

      <!-- Email: sempre o email do usuário, mas não editável -->
      <InputForm label="Email" :modelValue="auth.user.email || ''" disabled />
    </form>

    <AddPedidoButton label="Continuar" @click="salvarAlteracoes" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BackButton, AddPedidoButton, InputForm } from '@/components/index'
import { useAuthStore } from '@/stores/index'
import { user as UserApi } from '@/api/index'
import router from '@/router'

const auth = useAuthStore()
const userService = new UserApi.default()

const name = ref(auth.user.name)

async function salvarAlteracoes() {
  try {
    if (!auth.user?.id) {
      console.error('[DEBUG] Nenhum usuário logado para atualizar')
      return
    }

    const updatedUser = await userService.update(auth.user.id, {
      name: name.value
    })

    auth.user = { ...auth.user, ...updatedUser }
    localStorage.setItem('user', JSON.stringify(auth.user))

    console.log('[DEBUG] Usuário atualizado com sucesso:', updatedUser)
    router.push('/home/perfil')
  } catch (error) {
    console.error('[DEBUG] Erro ao atualizar usuário:', error)
  }
}

</script>

<style scoped>
.form-page {
  min-height: 100vh;
  box-sizing: border-box;
}

.form {
  display: flex;
  flex-direction: column;
  padding: 24px 16px 80px;
  gap: 16px;
  margin-top: 24px;
  font-weight: 550;
}
</style>
