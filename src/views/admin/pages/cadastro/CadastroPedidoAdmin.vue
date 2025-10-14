<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Pedidos > Cadastrar Pedido"
        subtitle="Cadastrar um novo pedido manualmente no sistema"
      />
    </main>
  </div>
</template>

<script setup>
import { NavLateralAdmin, TitleAdmin } from '@/components/index'
</script>
