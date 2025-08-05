// api/produto.js
import axios from '@/plugins/axios';

export default class ProdutoService {
  async getAll(params = {}) {
    const response = await axios.get('/produtos/', { params });
    return response.data;
  }

  async getById(id) {
    const response = await axios.get(`/produtos/${id}/`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post('/produtos/', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`/produtos/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/produtos/${id}/`);
    return response.status === 204;
  }
}
