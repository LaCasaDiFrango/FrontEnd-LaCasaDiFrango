import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '../views/PedidosView.vue'
import ProdutosView from '@/views/ProdutosView.vue'
import UserView from '@/views/UserView.vue'
import SignUpPageView from '@/views/SignUpPageView.vue'
import PerfilView from '@/views/PerfilView.vue'
import PagamentoView from '@/views/PagamentoView.vue'
import EnderecoView from '@/views/EnderecoView.vue'

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
        showNavbar: false,
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
      path: '/user',
      name: 'user',
      component: UserView,
    },
       {
      path: '/signup',
      name: 'signup',
      component: SignUpPageView,
    },
       {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
    },
     {
      path: '/pagamento',
      name: 'pagamento',
      component: PagamentoView,
    },
       {
      path: '/endereco',
      name: 'endereco',
      component: EnderecoView
    },
    
    

  ],
})

export default router
