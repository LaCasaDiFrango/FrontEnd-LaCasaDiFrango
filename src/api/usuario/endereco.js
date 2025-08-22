import axios from '@/plugins/axios';

export default class EnderecoService {
  async getAll() {
    const response = await axios.get('/enderecos/');
    return response.data;
  }

  async getById(id) {
    const response = await axios.get(`/enderecos/${id}/`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post('/enderecos/', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`/enderecos/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/enderecos/${id}/`);
    return response.status === 204;
  }
}
