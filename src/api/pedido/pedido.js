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
}
