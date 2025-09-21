<script setup>
import HomeIcon from '@/assets/img/home.png'
import ProdutosIcon from '@/assets/img/roasted-chicken.png'
import PedidoIcon from '@/assets/img/bill.png'
import PerfilIcon from '@/assets/img/people.png'

const links = [
  { to: '/', img: HomeIcon, alt: 'Início', text: 'Início' },
  { to: '/home/produtos', img: ProdutosIcon, alt: 'Produtos', text: 'Produtos' },
  { to: '/home/pedidos', img: PedidoIcon, alt: 'Pedido', text: 'Pedido' },
  { to: '/home/perfil', img: PerfilIcon, alt: 'Perfil', text: 'Perfil' }
]
</script>

<template>
  <nav>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">
          <img :src="link.img" :alt="link.alt" />
          <span>{{ link.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #d1d5db;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
  font-family: sans-serif;
}

ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
}

img {
  width: 30px;
  height: 30px;
  margin-bottom: 4px;
}

a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
