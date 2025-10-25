<script setup>
import HomeIcon from '@/assets/img/home.png'
import ProdutosIcon from '@/assets/img/roasted-chicken.png'
import PedidoIcon from '@/assets/img/bill.png'
import PerfilIcon from '@/assets/img/people.png'
import { computed } from 'vue'
import { usePedidoStore } from '@/stores'

const pedidoStore = usePedidoStore()

// ✅ Computed para mostrar o número total de itens do pedidoAtual
const qtdItens = computed(() => {
  if (!pedidoStore.pedidoAtual?.itens) return 0
  return pedidoStore.pedidoAtual.itens.reduce(
    (acc, item) => acc + (item.quantidade || 1),
    0
  )
})

const links = [
  { to: '/home', img: HomeIcon, alt: 'Início', text: 'Início' },
  { to: '/home/produtos', img: ProdutosIcon, alt: 'Produtos', text: 'Produtos' },
  { to: '/home/pedidos', img: PedidoIcon, alt: 'Pedido', text: 'Pedido' },
  { to: '/home/perfil', img: PerfilIcon, alt: 'Perfil', text: 'Perfil' }
]
</script>

<template>
  <nav>
    <ul>
      <li v-for="(link, index) in links" :key="index" class="relative">
        <router-link :to="link.to" class="relative flex flex-col items-center">
          <img :src="link.img" :alt="link.alt" />

          <!-- ✅ Badge com número de produtos -->
          <span
            v-if="link.text === 'Pedido' && qtdItens > 0"
            class="absolute top-0 right-4 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[11px] font-bold rounded-full animate-bounce"
          >
            {{ qtdItens }}
          </span>

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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}

</style>
