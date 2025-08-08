<template>
  <div class="perfil-container">
    <BackButton />

    <div class="user-info">
      <div class="user-name">
        <template v-if="auth.isGuest">
          Você é um convidado
        </template>
        <template v-else>
          {{ auth.user.nome || 'Usuário sem nome' }}
          <div class="user-email">
            {{ auth.user.email || 'Sem email' }}
          </div>
        </template>
      </div>

      <img
        src="/src/assets/img/user.png"
        alt="Ícone de usuário"
        class="user-icon"
      />
    </div>

    <template v-if="auth.isGuest">
      <AuthButton
        :filled="false"
        class="perfil-auth-button"
        @click="() => router.push('/signup')"
      >
        Login / Cadastro
      </AuthButton>
    </template>

    <template v-else>
      <AuthButton
        :filled="false"
        class="perfil-auth-button"
        @click="atualizarUsuario"
      >
        Atualizar Usuário
      </AuthButton>
    </template>

    <ProfileActionCard
      text="Formas De Pagamento"
      icon="/src/assets/img/wallet.png"
      :onClick="() => router.push('/home/perfil/pagamento')"
    />
    <ProfileActionCard
      text="Histórico De Pedidos"
      icon="/src/assets/img/add-to-cart.png"
      :onClick="() => router.push('/home/perfil/historico-pedidos')"
    />
    <ProfileActionCard
      text="Editar Endereço"
      icon="/src/assets/img/house.png"
      :onClick="() => router.push('/home/perfil/endereco')"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BackButton, ProfileActionCard, AuthButton } from '@/components/index'
import { useAuthStore } from '@/stores/index'

const router = useRouter()
const auth = useAuthStore()

function atualizarUsuario() {
  console.log('Atualizar dados do usuário (objeto puro):', { ...auth.user })
  console.log('JSON.stringify do usuário:', JSON.stringify(auth.user))
}

onMounted(() => {
  console.log('[DEBUG] Usuário carregado na tela de perfil:', { ...auth.user })
})
</script>

<style scoped>
.perfil-container {
  padding: 16px;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36px 0 20px;
}

.user-name {
  font-size: 1.8rem;
  font-weight: 500;
}

.user-email {
  font-size: 0.9rem;
  font-weight: 400;
  color: gray;
}

.user-icon {
  width: 70px;
  height: 70px;
}

.perfil-auth-button {
  padding: 0.5rem 0 !important;
  font-size: 0.75rem !important;
  width: 70% !important;
  margin-bottom: 70px;
}
</style>
