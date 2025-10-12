import axios from '@/plugins/axios'

/**
 * Busca todas as páginas de um endpoint paginado do Django REST Framework.
 * Aceita URL direta (ex: '/pedidos/') e retorna um array com todos os itens.
 */
export async function fetchAllPages(endpoint, params = {}) {
  let results = []
  let nextUrl = endpoint

  while (nextUrl) {
    const response = await axios.get(nextUrl, { params })
    const data = response.data

    // Se não houver paginação, retorna direto
    if (Array.isArray(data)) return data

    results = results.concat(data.results)
    nextUrl = data.next
  }

  return results
}
