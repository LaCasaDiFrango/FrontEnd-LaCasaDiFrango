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
import { info } from 'autoprefixer'

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
            actions: {
              addRoute: '/dashboard/estoque/cadastro-produto',
              addLabel: 'Cadastrar Novo Produto',
              infoCardValue: '18 Relatórios Disponíveis',
              infoCardSubtitle: 'Atualize o estoque regularmente para manter o controle dos produtos.',
              dropdown: [
                {
                  label: 'Alterar Estoque',
                  route: '/dashboard/estoque/alterar-estoque' // a rota de alteração
                }
              ]
            },
            columns: [
              { key: 'nome', label: 'Nome' },
              { key: 'quantidade_em_estoque', label: 'Quantidade' },
              { key: 'preco', label: 'Preço' },
            ],
          }
        },
        {
          path: 'usuarios',
          name: 'Usuários',
          component: () => import('@/views/admin/pages/DashboardPagesAdmin.vue'),
          props: {
            pageTitle: 'Usuários',
            dataKey: 'usuarios',
            actions: {
              addRoute: '/dashboard/usuarios/cadastro-usuario',
              addLabel: 'Cadastrar Novo Usuário',
              infoCardValue: '120 Usuários Ativos',
              infoCardSubtitle: 'Gerencie os usuários e suas permissões de acesso.'
            },
            columns: [
              { key: 'email', label: 'Email' },
              { key: 'perfil', label: 'Perfil' },
            ],
          }
        },
        {
          path: 'pedidos',
          name: 'Pedidos',
          component: () => import('@/views/admin/pages/DashboardPagesAdmin.vue'),
          props: {
            pageTitle: 'Pedidos',
            dataKey: 'pedidos',
            actions: {
              addRoute: '/dashboard/pedidos/cadastro-pedido',
              addLabel: 'Cadastrar Novo Pedido',
              infoCardValue: '75 Pedidos Realizados',
              infoCardSubtitle: 'Monitore e gerencie os pedidos realizados pelos clientes.',
            },
            columns: [
              { key: 'usuario', label: 'Nome' },
              { key: 'status', label: 'Status' },
            ],
          }
        },
        {
          path: 'estatisticas',
          name: 'Estatísticas',
          component: () => import('@/views/admin/pages/DashboardEstatisticasAdmin.vue'),
          props: {
            pageTitle: 'Estatísticas',
            dataKey: 'estatisticas',
          }
        },
        {
          path: 'fluxo',
          name: 'Fluxo de Caixa',
          component: () => import('@/views/admin/pages/DashboardFluxoCaixaAdmin.vue'),
          props: {
            pageTitle: 'Fluxo de Caixa',
            dataKey: 'fluxo',
          }
        },
        {
          path: 'usuarios/cadastro-usuario',
          name: 'Cadastro de Usuários',
          component: () => import('@/views/admin/pages/cadastro/CadastroUsuarioAdmin.vue'),
        },
        {
          path: 'estoque/cadastro-produto',
          name: 'Cadastro de Produtos',
          component: () => import('@/views/admin/pages/cadastro/CasdastroProdutoAdmin.vue'),
        },
        {
          path: 'estoque/alterar-estoque',
          name: 'Alterar Estoque',
          component: () => import('@/views/admin/pages/alterar/AlterarEstoqueAdmin.vue'),
        },
        {
          path: 'pedidos/cadastro-pedido',
          name: 'Cadastro de Pedidos',
          component: () => import('@/views/admin/pages/cadastro/CadastroPedidoAdmin.vue'),
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
