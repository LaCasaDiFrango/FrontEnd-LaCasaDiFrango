//usuario
import { useAuthStore } from './usuario/auth'
import { useUserStore } from './usuario/user'

//pedido
import { usePedidoStore } from './pedido/pedido'

//produto
import { useCardapioStore } from './produto/cardapio'
import { useProdutoStore } from './produto/produto'

import { useToastStore } from './toast' // import da store do toast

//admin
import { useNavBarAdminStore } from './admin/navbar_admin'
import { useActionSelectorStore } from './admin/button_action_admin'

//loading
import { useUiStore } from './ui'

export {
  useAuthStore,
  useCardapioStore,
  useProdutoStore,
  useToastStore,
  usePedidoStore,
  useUserStore,
  useNavBarAdminStore,
  useActionSelectorStore,
  useUiStore,
}
