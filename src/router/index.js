import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '../views/PedidosView.vue'
import CardapioView from '@/views/cardapio/CardapioView.vue'
import UserView from '@/views/UserView.vue'
import SignUpPageView from '@/views/SignUpPageView.vue'
import PerfilView from '@/views/PerfilView.vue'
import PagamentoView from '@/views/PagamentoView.vue'
import DebitandCreditView from '@/views/DebitandCreditView.vue'
import EnderecoView from '@/views/EnderecoView.vue'
import EnderecoFormView from '@/views/EnderecoFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        showNavbar: true,
        showHeader: true,
      }
      
    },
          {
      path: '/',
      name: 'user',
      component: UserView,
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
      component: CardapioView,
       meta: {
        showNavbar: false,
        showHeader: false,
      }
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
      path: '/debitandcredit',
      name: 'debitandcredit',
      component: DebitandCreditView,
    },

       {
      path: '/endereco',
      name: 'endereco',
      component: EnderecoView
    },
       {
      path: '/form-endereco',
      name: 'form-endereco',
      component: EnderecoFormView
    },
    

  ],
})

export default router
