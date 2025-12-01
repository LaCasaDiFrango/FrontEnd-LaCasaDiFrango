<template>
  <div>
    <HeaderComponent v-if="route.meta.showHeader" endereco="Rua Ascurra, 193" />
    <router-view />
    <NavBar v-if="route.meta.showNavbar" :links="menuLinks"/>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {HeaderComponent, NavBar} from '@/components/index'
import { useUiStore } from '@/stores/index'
const menuLinks = [
  { to: '/', img: '/src/assets/img/home.png', alt: 'Início', text: 'Início' },
  { to: '/home/produtos', img: '/src/assets/img/roasted-chicken.png', alt: 'Produtos', text: 'Produtos' },
  { to: '/home/pedidos', img: '/src/assets/img/bill.png', alt: 'Pedido', text: 'Pedido' },
  { to: '/home/perfil', img: '/src/assets/img/people.png', alt: 'Perfil', text: 'Perfil' }
]


const route = useRoute()
</script>
<style>
/* global CSS — coloque em um arquivo importado globalmente OU
   em <style> (SEM scoped) dentro do componente */
.hide-scrollbar {
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #60a5fa #f3f4f6; /* thumb track (Firefox) */
}

/* WebKit */
.hide-scrollbar::-webkit-scrollbar{
  height: 8px;
}
.hide-scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
  border-radius: 10px;
}
.hide-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #60a5fa, #3b82f6);
  border-radius: 10px;
  transition: background-color 0.18s ease, box-shadow 0.18s ease;
}
.hide-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #2563eb, #1d4ed8);
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
}

</style>
