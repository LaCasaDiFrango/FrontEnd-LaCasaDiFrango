<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        title="Painel Administrativo > Estoque > Cadastrar Produto"
        subtitle="Cadastre um novo produto no sistema"
      />

      <div class="flex w-full flex-col justify-center gap-4 bg-white rounded-2xl shadow-md p-5">
        <InputStringAdmin label="Nome" placeholder="Nome do Produto" />
        <InputStringAdmin label="Descrição" placeholder="Descrição do Produto" />
        <InputImageAdmin />
        <div class="flex w-full gap-4">
          <div class="flex-1">
            <InputStringAdmin label="Valor" placeholder="Valor do Produto" />
          </div>
          <div class="flex-1">
            <InputStringAdmin label="Quantidade" placeholder="Quantidade em Estoque" />
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
import {
  NavLateralAdmin,
  TitleAdmin,
  InputStringAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  ButtonCadastroAdmin,
} from '@/components/index'
import { useUsuariosStore } from '@/stores/index'
</script>

