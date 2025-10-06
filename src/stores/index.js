//usuario
import { useAuthStore } from './usuario/auth'
import { useUserStore } from './usuario/user'

//pedido
import { usePedidoStore } from './pedido/pedido'

//produto
import { useCardapioStore } from './produto/cardapio'
import { useProdutoStore } from './produto/produto'

import { useToastStore } from './toast' // import da store do toast

import { useUiStore } from './ui'

export {
  useAuthStore,
  useCardapioStore,
  useProdutoStore,
  useToastStore,
  usePedidoStore,
  useUserStore,
  useUiStore
}
