import axios from '@/plugins/axios';

export default class PagamentoService {
  async getAll() {
    const response = await axios.get('/pagamentos/');
    return response.data;
  }

  async getById(id) {
    const response = await axios.get(`/pagamentos/${id}/`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post('/pagamentos/', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`/pagamentos/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/pagamentos/${id}/`);
    return response.status === 204;
  }
}
