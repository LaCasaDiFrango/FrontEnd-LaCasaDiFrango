import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PedidosView from '../views/pedido/PedidosView.vue'
import CardapioView from '@/views/cardapio/CardapioView.vue'
import UserView from '@/views/usuario/UserView.vue'
import SignUpPageView from '@/views/SignUpPageView.vue'
import PerfilView from '@/views/usuario/PerfilView.vue'
import ProdutoView from '@/views/cardapio/ProdutoView.vue'
import PagamentoView from '@/views/pagamento/PagamentoView.vue'
import DebitandCreditView from '@/views/pagamento/DebitandCreditView.vue'
import EnderecoView from '@/views/endereco/EnderecoView.vue'
import EnderecoFormView from '@/views/endereco/EnderecoFormView.vue'
import HistoricoPedidosView from '@/views/pedido/HistoricoPedidosView.vue'
import DetalhesPedidoView from '@/views/pedido/DetalhesPedidoView.vue'
import DetalhesPagamentoView from '@/views/pagamento/DetalhesPagamentoView.vue'
import AtualizarUsuario from '@/views/usuario/AtualizarUsuario.vue'

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
    },
      {
    path: '/home/produtos/:id',
    name: 'ProdutoDetalhe',
    component: ProdutoView,
    props: true,
  },

       {
      path: '/signup',
      name: 'signup',
      component: SignUpPageView,
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
      path: '/home/perfil/editar',
      name: 'editar-perfil',
      component: AtualizarUsuario,
    },
    {
      path: '/home/perfil/historico-pedidos/detalhes-pedido/:id',
      name: 'detalhes-pedido',
      component: DetalhesPedidoView,
      props: true,
    },
    {
      path: '/home/pedidos/detalhes-pagamento',
      name: 'detalhes-pagamento',
      component: DetalhesPagamentoView,
    }
  ],
})

export default router
