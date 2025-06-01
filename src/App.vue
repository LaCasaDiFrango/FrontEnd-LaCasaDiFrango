<script setup>

import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import HeaderComponent from './components/HeaderComponent.vue'

</script>



<template>
  <HeaderComponent />

  <RouterView />
  <NavBar/>

</template>

<style>

</style>
