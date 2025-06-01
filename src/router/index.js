import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '../views/PedidosView.vue'
import ProdutosView from '@/views/ProdutosView.vue'
import PerfilView from '@/views/PerfilView.vue'
import LoginPageView from '@/views/LoginPageView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        showNavbar: true,
        showHeader: true,
      }
      
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: PedidosView,
       meta: {
        showNavbar: true,
        showHeader: false,
      }
    },
        {
      path: '/produtos',
      name: 'produtos',
      component: ProdutosView,
       meta: {
        showNavbar: false,
        showHeader: false,
      }
    },
      {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
    },
       {
      path: '/login',
      name: 'login',
      component: LoginPageView,
    },

    
    

  ],
})

export default router
