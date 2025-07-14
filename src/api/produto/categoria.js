import axios from '@/plugins/axios';

export default class CategoriaService {
  async getAll() {
    const response = await axios.get('/categorias/');
    return response.data;
  }

  async getById(id) {
    const response = await axios.get(`/categorias/${id}/`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post('/categorias/', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`/categorias/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/categorias/${id}/`);
    return response.status === 204;
  }
}
