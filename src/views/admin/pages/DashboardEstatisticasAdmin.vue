<template>
  <div class="flex">
    <NavLateralAdmin />

    <main class="flex-1 p-6 space-y-6 overflow-hidden">
      <TitleAdmin
        :title="dashboardTitleStore.title"
        :subtitle="dashboardTitleStore.subtitle"
      />
    </main>
  </div>
</template>

<script setup>
import { NavLateralAdmin, TitleAdmin } from '@/components/index'
import { useDashboardTitleStore } from '@/stores/index'

const dashboardTitleStore = useDashboardTitleStore()
</script>
