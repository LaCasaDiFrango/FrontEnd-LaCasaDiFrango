import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '../views/PedidosView.vue'
import ProdutosView from '@/views/ProdutosView.vue'
import PerfilView from '@/views/PerfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: PedidosView,
    },
        {
      path: '/produtos',
      name: 'produtos',
      component: ProdutosView,
    },
      {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
    },
    
    

  ],
})

export default router
