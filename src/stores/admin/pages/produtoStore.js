import { defineStore } from 'pinia'
import { ref } from 'vue'
import { produto } from '@/api/index'

export const useProdutosStore = defineStore('produtos', () => {
  const produtoService = new produto.default()
  const produtos = ref([])

  // Buscar todos os produtos
async function fetchProdutos() {
  try {
    const todosProdutos = []
    let page = 1
    let totalPages = 1

    do {
      const data = await produtoService.getAll({ page })
      if (data.results?.length) {
        todosProdutos.push(...data.results)
      }
      totalPages = data.total_pages || 1
      page++
    } while (page <= totalPages)

    produtos.value = todosProdutos
  } catch (err) {
    console.error('[ProdutosStore] Erro:', err)
  }
}


  // Cadastrar novo produto
  async function cadastrarProduto(produtoData) {
    try {
      const response = await produtoService.create(produtoData)
      produtos.value.push(response)
      return response
    } catch (err) {
      console.error('[ProdutosStore] Erro ao cadastrar produto:', err)
      throw err
    }
  }

  // Atualizar preço de um produto
// Dentro de stores/produtos.js
async function atualizarPreco(id, precoParaEnviar) {
  try {
    const precoString = String(precoParaEnviar).replace(',', '.');
    const valorNumerico = parseFloat(precoString);

    if (isNaN(valorNumerico)) {
      throw new Error('Formato de preço inválido.');
    }

    // Envia para a API
    await produtoService.alterarPreco(id, valorNumerico);

    // --- LÓGICA DE ATUALIZAÇÃO CORRIGIDA ---
    const index = produtos.value.findIndex(p => p.id === id);
    if (index !== -1) {
      // 1. Crie uma cópia do objeto antigo
      const produtoAtualizado = { 
        ...produtos.value[index], // Copia todas as propriedades (id, nome, image, etc.)
      };

      // 2. Modifique o preço NA CÓPIA
      produtoAtualizado.preco = valorNumerico.toFixed(2); // ex: "13.90"

      // 3. Substitua o objeto antigo no array pela nova cópia
      produtos.value[index] = produtoAtualizado;

       console.log(`[STORE] Produto ${id} atualizado. Novo preço no estado: ${produtos.value[index].preco}`);
    }
    // --- FIM DA CORREÇÃO ---
    
  } catch (err) {
    console.error('[ProdutosStore] Erro ao alterar preço:', err);
    throw err;
  }
}

  // Deletar produto
  async function deletarProduto(id) {
    try {
      const ok = await produtoService.delete(id)
      if (ok) {
        produtos.value = produtos.value.filter(p => p.id !== id)
      }
      return ok
    } catch (err) {
      console.error('[ProdutosStore] Erro ao deletar produto:', err)
      throw err
    }
  }

  return {
    produtos,
    fetchProdutos,
    cadastrarProduto,
    atualizarPreco,
    deletarProduto,
  }
})
