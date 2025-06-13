<template>
  <div>
    <HeaderComponent v-if="route.meta.showHeader" />
    <router-view />
    <NavBar v-if="route.meta.showNavbar" />

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import NavBar from '@/components/layout/NavBar.vue'

const route = useRoute()
</script>
