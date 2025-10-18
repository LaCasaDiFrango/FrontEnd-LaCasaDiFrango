import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: [],
  }),
  getters: {
    total: (state) =>
      state.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
  },
  actions: {
    adicionarProduto(produto) {
      const existente = this.itens.find((p) => p.id === produto.id)
      if (existente) {
        existente.quantidade = produto.quantidade
        if (existente.quantidade === 0) {
          this.itens = this.itens.filter((p) => p.id !== produto.id)
        }
      } else if (produto.quantidade > 0) {
        this.itens.push({ ...produto })
      }
    },
  },
})
