<template>
  <div v-if="!store.isMobile" class="flex">
    <aside
      class="fixed top-0 left-0 h-screen w-64 bg-gray-100 p-5 flex flex-col gap-8 z-50"
    >
      <NavbarAdminUser />
      <NavbarAdminMenu />

      <div class="flex justify-center items-center w-full mt-auto">
        <img
          src="@/assets/img/logo.png"
          alt="Logo"
          class="w-32 h-auto mb-5"
        />
      </div>
    </aside>

    <!-- Conteúdo principal deslocado -->
    <div class="ml-64 w-full">
      <slot />
    </div>
  </div>

  <div v-else>
    <NavLateralResponsive />
  </div>
</template>

<script setup>
import { useNavBarAdminStore } from '@/stores/index'
import { NavLateralResponsive, NavbarAdminUser, NavbarAdminMenu } from '@/components/index'

const store = useNavBarAdminStore()
store.initResizeListener()
</script>

<style scoped></style>
