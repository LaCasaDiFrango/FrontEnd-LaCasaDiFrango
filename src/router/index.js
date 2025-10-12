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
import HistoriaView from '@/views/HistoriaView.vue'

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
    },
    {
      path: '/historia',
      name: 'historia',
      component: HistoriaView,
    },
{
  path: '/dashboard',
  name: 'admin',
  meta: { requiresAdmin: true },
  children: [
            {
          path: '',
          name: 'Painel Administrativo',
          component: () => import('@/views/admin/HomeView.vue')
        },
    {
      path: 'estoque',
      name: 'Estoque',
      component: () => import('@/views/admin/pages/DashboardPagesAdmin.vue'),
      props: {
        pageTitle: 'Estoque',
        dataKey: 'produtos',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'nome', label: 'Produto' },
          { key: 'preco', label: 'Preço' },
          { key: 'quantidade', label: 'Qtd' }
        ],
        actions: {
          add: () => console.log('Adicionar produto'),
          addLabel: 'Novo Produto'
        }
      }
    },
    {
      path: 'usuarios',
      name: 'Usuários',
      component: () => import('@/views/admin/pages/DashboardPagesAdmin.vue'),
      props: {
        pageTitle: 'Usuários',
        dataKey: 'usuarios',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'nome', label: 'Nome' },
          { key: 'email', label: 'Email' }
        ],
        actions: {
          add: () => console.log('Adicionar usuário'),
          addLabel: 'Novo Usuário'
        }
      }
    },
    {
      path: 'pedidos',
      name: 'Pedidos',
      component: () => import('@/views/admin/pages/DashboardPagesAdmin.vue'),
      props: {
        pageTitle: 'Pedidos',
        dataKey: 'pedidos',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'usuario', label: 'Usuário' },
          { key: 'total', label: 'Total' },
          { key: 'status', label: 'Status' }
        ],
        actions: {
          add: null,
          addLabel: null
        }
      }
    },
    {
      path: 'estatisticas',
      name: 'Estatísticas',
      component: () => import('@/views/admin/pages/DashboardEstatisticasAdmin.vue'),
      props: {
        pageTitle: 'Estatísticas',
        dataKey: 'estatisticas',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'usuario', label: 'Usuário' },
          { key: 'total', label: 'Total' }
        ]
      }
    },
        {
      path: 'fluxo',
      name: 'Fluxo de Caixa',
      component: () => import('@/views/admin/pages/DashboardFluxoCaixaAdmin.vue'),
      props: {
        pageTitle: 'Fluxo de Caixa',
        dataKey: 'fluxo',
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'usuario', label: 'Usuário' },
          { key: 'total', label: 'Total' }
        ]
      }
    },
  ]
}

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition 
    } else {
      return { top: 0 } 
    }
  }
})

export default router
