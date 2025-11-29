// api/pedido.js
import axios from '@/plugins/axios';

export default class PedidoService {
  getAll(params) {
    return axios.get('/pedidos/', { params })
  }

  async getById(id) {
    const response = await axios.get(`/pedidos/${id}/`);
    return response.data;
  }

  async create(data) {
    console.debug('[DEBUG PedidoService.create] Payload enviado para API:', data)
    const response = await axios.post('/pedidos/', data)
    return response.data
  }

  async finalizar(id) {
    const response = await axios.post(`/pedidos/${id}/finalizar/`)
    return response.data
  }

  async update(id, data) {
    const response = await axios.patch(`/pedidos/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/pedidos/${id}/`);
    return response.status === 204;
  }

  async removerItem(pedidoId, produtoId) {
    const response = await axios.delete(`/pedidos/${pedidoId}/remover_item/`, {
      data: { produto_id: produtoId },
    })
    return response.data
  }

  // 🔥 Novo método para os últimos 7 dias
  async ultimosPedidos() {
    try {
      const response = await axios.get('/pedidos/ultimos-7-dias/');
      return response.data;
    } catch (error) {
      console.error('[ERROR PedidoService.ultimosPedidos]', error);
      return []; 
    }
  }
  async totalVendas() {
  try {
    const response = await axios.get('/pedidos/stats/total-vendas/')
    return response.data.total_vendas
  } catch (err) {
    console.error('[PedidoService.totalVendas] Erro:', err)
    return 0
  }
}

}
