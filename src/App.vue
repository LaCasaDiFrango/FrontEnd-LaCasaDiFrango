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
const menuLinks = [
  { to: '/', img: '/src/assets/img/home.png', alt: 'Início', text: 'Início' },
  { to: '/home/produtos', img: '/src/assets/img/roasted-chicken.png', alt: 'Produtos', text: 'Produtos' },
  { to: '/home/pedidos', img: '/src/assets/img/bill.png', alt: 'Pedido', text: 'Pedido' },
  { to: '/home/perfil', img: '/src/assets/img/people.png', alt: 'Perfil', text: 'Perfil' }
]


const route = useRoute()
</script>
