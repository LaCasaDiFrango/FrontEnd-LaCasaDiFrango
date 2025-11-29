<script setup>
import { useNavBarAdminStore } from '@/stores/index'
import { NavLateralResponsive, NavbarAdminUser, NavbarAdminMenu } from '@/components/index'

const store = useNavBarAdminStore()
store.initResizeListener()
</script>

<template>
  <div v-if="!store.isMobile" class="flex">
    <aside class="min-h-screen bg-gray-100 p-5 flex flex-col gap-8">
      <NavbarAdminUser />
      <NavbarAdminMenu />
      <div class="flex justify-center items-center w-full">
                    <img
        src="@/assets/img/logo.png"
        alt="Logo"
        class="fixed bottom-5 w-32 h-auto"
      />
      </div>
    </aside>
  </div>
  <div v-else>
    <NavLateralResponsive />
  </div>
</template>

<style scoped></style>