<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin :title="dashboardTitleStore.title" :subtitle="dashboardTitleStore.subtitle" />
      <div class="flex w-full justify-center items-center p-0 h-[50%]">
        <div class="grid grid-cols-2 gap-6 w-[60%]">
          <InfoCardAdmin
            :icon="imageDebito"
            title="Débito"
            value="R$12.000,00"
            subtitle="Movimentação do dia"
          />
          <InfoCardAdmin
            :icon="imageCredito"
            title="Crédito"
            value="R$12.000,00"
            subtitle="Movimentação do dia"
          />
          <InfoCardAdmin
            :icon="imagePix"
            title="Pix"
            value="R$12.000,00"
            subtitle="Movimentação do dia"
          />
          <InfoCardAdmin
            :icon="imageDinheiro"
            title="Dinheiro"
            value="R$12.000,00"
            subtitle="Movimentação do dia"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { NavLateralAdmin, TitleAdmin, InfoCardAdmin } from '@/components/index'
import { useDashboardTitleStore } from '@/stores/index'

const dashboardTitleStore = useDashboardTitleStore()

import imageCredito from '@/assets/img/admin/credito.png'
import imageDebito from '@/assets/img/admin/debito.png'
import imageDinheiro from '@/assets/img/admin/dinheiro.png'
import imagePix from '@/assets/img/admin/pix.png'
</script>