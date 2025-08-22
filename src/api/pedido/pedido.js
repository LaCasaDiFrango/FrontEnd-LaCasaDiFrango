// api/pedido.js
import axios from '@/plugins/axios';

export default class PedidoService {
  async getAll() {
    const response = await axios.get('/pedidos/');
    // Retorne o array que está dentro de 'results'
    return response.data.results;
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
    const response = await axios.put(`/pedidos/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/pedidos/${id}/`);
    return response.status === 204;
  }
}
