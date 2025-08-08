//usuario
import { useAuthStore } from './usuario/auth'
import { useUserStore } from './usuario/user'

//pedido
import { usePedidoStore } from './pedido/pedido'

//produto
import { useCardapioStore } from './produto/cardapio'
import { useProdutoStore } from './produto/produto'

export {
  useAuthStore,
  useCardapioStore,
  useProdutoStore,
  usePedidoStore,
  useUserStore
}
