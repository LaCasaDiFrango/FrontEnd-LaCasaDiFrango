import axios from '@/plugins/axios';

export default class UserService {
  getAll(params) {
    return axios.get('/usuarios/', { params })
  }

  async getById(id) {
    const response = await axios.get(`/usuarios/${id}/`);
    return response.data;
  }

  async create(data) {
    const response = await axios.post('/usuarios/', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.patch(`/usuarios/${id}/`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`/usuarios/${id}/`);
    return response.status === 204;
  }

  async ativosInativos() {
    const response = await axios.get('/usuarios/ativos_inativos/');
    return response.data;
  }
}
