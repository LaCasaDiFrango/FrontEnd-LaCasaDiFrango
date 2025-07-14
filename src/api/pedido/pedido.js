// api/pedido.js
import axios from '@/plugins/axios';

export default class PedidoService {
  async getAll() {
    const response = await axios.get('/pedidos/');
    return response.data;
  }

  async getById(id) {
    const response = await axios.get(`/pedidos/${id}/`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post('/pedidos/', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`/pedidos/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/pedidos/${id}/`);
    return response.status === 204;
  }
}
