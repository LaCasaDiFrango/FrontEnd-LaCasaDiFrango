<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Usuários > Cadastrar Usuário"
        subtitle="Cadastre um novo usuário no sistema"
      />

      <div class="flex w-full flex-col justify-center gap-4 bg-white rounded-2xl shadow-md p-5">
          <InputStringAdmin
            label="Email"
            placeholder="Email do usuário"
          />
          <InputStringAdmin
            label="Usuário"
            placeholder="Nome do usuário"
          />
          <InputImageAdmin />
          <InputSelectAdmin
            label="Tipo de Usuário"
            :options="[
              { label: 'Administrador', value: 'administrador' },
              { label: 'Usuário', value: 'usuario' }
            ]"
            placeholder="Selecione o tipo de usuário"
          />
          <div class="w-full flex justify-center items-center">
          <ButtonCadastroAdmin
            label="Cadastrar"
            @click="() => console.log('Clicou em cadastrar')"
          />
          </div>
      </div>
    </main>
  </div>
</template>


<script setup>
import { computed, watch } from 'vue'
import { NavLateralAdmin, TitleAdmin, InputStringAdmin, InputImageAdmin, InputSelectAdmin, ButtonCadastroAdmin } from '@/components/index'
import { useUsuariosStore } from '@/stores/index'

</script>

