<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Estoque > Alterar Estoque"
        subtitle="Alterar as informações de um produto no estoque"
      />
    </main>
  </div>
</template>

<script setup>
import { NavLateralAdmin, TitleAdmin } from '@/components/index'
</script>
