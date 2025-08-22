<template>
  <div>
    <HeaderComponent v-if="route.meta.showHeader" />
    <router-view />
    <NavBar v-if="route.meta.showNavbar" />

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {HeaderComponent, NavBar} from '@/components/index'

const route = useRoute()
</script>
