<template>
  <div class="perfil-container">
    <BackButton />

    <div class="user-info">
      <div class="user-name">Nome Do Usuário </div>

      <img src="/src/assets/img/user.png" alt="Ícone de usuário" class="user-icon" />
    </div>
    <AuthButton :filled="false" class="perfil-auth-button" @click="() => router.push('/user')"> Login / Cadastro </AuthButton>
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
import { useRouter } from 'vue-router'
import {BackButton, ProfileActionCard, AuthButton} from '@/components/index'

const router = useRouter()
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
