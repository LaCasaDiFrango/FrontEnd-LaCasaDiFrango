import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '../views/PedidosView.vue'
import CardapioView from '@/views/cardapio/CardapioView.vue'
import UserView from '@/views/UserView.vue'
import SignUpPageView from '@/views/SignUpPageView.vue'
import PerfilView from '@/views/PerfilView.vue'
import PagamentoView from '@/views/pagamento/PagamentoView.vue'
import DebitandCreditView from '@/views/pagamento/DebitandCreditView.vue'
import EnderecoView from '@/views/EnderecoView.vue'
import EnderecoFormView from '@/views/EnderecoFormView.vue'
import HistoricoPedidosView from '@/views/pedido/HistoricoPedidosView.vue'
import DetalhesPedidoView from '@/views/pedido/DetalhesPedidoView.vue'
import DetalhesPagamentoView from '@/views/pagamento/DetalhesPagamentoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: UserView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPageView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        showNavbar: true,
        showHeader: true,
      },
    },
    {
      path: '/home/pedidos',
      name: 'pedidos',
      component: PedidosView,
      meta: {
        showNavbar: false,
        showHeader: false,
      },
    },
    {
      path: '/home/produtos',
      name: 'produtos',
      component: CardapioView,
      meta: {
        showNavbar: false,
        showHeader: false,
      },
    },
    {
      path: '/home/perfil',
      name: 'perfil',
      component: PerfilView,
    },
    {
      path: '/home/perfil/pagamento',
      name: 'pagamento',
      component: PagamentoView,
    },
    {
      path: '/home/perfil/pagamento/debitandcredit',
      name: 'debitandcredit',
      component: DebitandCreditView,
    },
    {
      path: '/home/perfil/endereco',
      name: 'endereco',
      component: EnderecoView,
    },
    {
      path: '/home/perfil/endereco/form-endereco',
      name: 'form-endereco',
      component: EnderecoFormView,
    },
    {
      path: '/home/perfil/historico-pedidos',
      name: 'historico-pedidos',
      component: HistoricoPedidosView,
    },
    {
      path: '/home/perfil/historico-pedidos/detalhes-pedido',
      name: 'detalhes-pedido',
      component: DetalhesPedidoView,
      props: true,
    },
    {
      path: '/home/detalhes-pagamento',
      name: 'detalhes-pagamento',
      component: DetalhesPagamentoView,
    }
  ],
})

export default router
