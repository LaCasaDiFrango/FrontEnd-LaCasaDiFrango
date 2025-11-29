<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin :title="dashboardTitleStore.title" :subtitle="dashboardTitleStore.subtitle" />

      <div class="flex w-full justify-center items-center py-20">
        <div class="grid grid-cols-2 gap-10 w-[70%]">
          <InfoCardAdmin
            :icon="imageDebito"
            title="Débito"
            value="R$1200,00"
            subtitle="Movimentação do dia"
            class="min-h-[160px]"
          />
          <InfoCardAdmin
            :icon="imageCredito"
            title="Crédito"
            value="R$740,00"
            subtitle="Movimentação do dia"
            class="min-h-[160px]"
          />
          <InfoCardAdmin
            :icon="imagePix"
            title="Pix"
            value="R$500,00"
            subtitle="Movimentação do dia"
            class="min-h-[160px]"
          />
          <InfoCardAdmin
            :icon="imageDinheiro"
            title="Dinheiro"
            value="R$1002,00"
            subtitle="Movimentação do dia"
            class="min-h-[160px]"
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
