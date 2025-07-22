//usuario
import { useAuthStore } from './usuario/auth'

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
}
