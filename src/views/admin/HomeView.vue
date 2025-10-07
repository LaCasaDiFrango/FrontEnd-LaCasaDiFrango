<script setup>
import { ref } from 'vue'
import {
  NavLateralAdmin,
  ButtonActionAdmin,
  InputDateAdmin,
  InputImageAdmin,
  InputSelectAdmin,
  InputStringAdmin,
  TitleAdmin,
  InfoCardAdmin,
} from '@/components/index'

import imageFluxo from '@/assets/img/admin/money-cash-svgrepo-com.svg'
import imagePedido from '@/assets/img/admin/order-svgrepo-com.svg'
import imageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import imageEstoque from '@/assets/img/admin/inventorymajor-svgrepo-com.svg'

</script>

<template>
  <div class="flex">
    <NavLateralAdmin />
    <main class="flex-1 p-6 space-y-6">
    <TitleAdmin title="Painel Administrativo" subtitle="Veja um resumo do que há cadastrado no Sistema"/>
  <div class="flex gap-6">
        <InfoCardAdmin
          title="Usuários"
          value="23 Clientes"
          subtitle="Última atualização há 1 hora"
          :icon="imageUser"
          color="bg-green-400"
          link="/usuarios"
        />

        <InfoCardAdmin
          title="Estoque"
          value="102 Produtos"
          subtitle="Última atualização hoje às 13:05"
          :icon="imageEstoque"
          color="bg-yellow-400"
          link="/estoque"
        />

        <InfoCardAdmin
          title="Fluxo de Caixa"
          value="R$2700"
          subtitle="Movimentação do dia"
          :icon="imageFluxo"
          color="bg-blue-400"
          link="/fluxo"
        />

        <InfoCardAdmin
          title="Pedidos"
          value="54 Entregues"
          subtitle="Última atualização há 2h"
          :icon="imagePedido"
          color="bg-orange-400"
          link="/pedidos"
        />
      </div>





      <!--<ButtonActionAdmin
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
      </form>-->
    </main>
  </div>
</template>

<style scoped>

</style>
