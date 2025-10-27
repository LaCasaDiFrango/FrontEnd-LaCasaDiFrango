import axios from '@/plugins/axios'

export default class UserService {
  async getRaw(url = '/usuarios/', params = {}) {
  const response = await axios.get(url, { params })
  return response.data
}

  async getAll(params) {
    const response = await axios.get('/usuarios/', { params })
    return response.data
  }

  async getById(id) {
    const response = await axios.get(`/usuarios/${id}/`)
    return response.data
  }

  async create(data) {
    const response = await axios.post('/usuarios/', data)
    return response.data
  }

  async update(id, data) {
    const response = await axios.patch(`/usuarios/${id}/`, data)
    return response.data
  }

  async delete(id) {
    const response = await axios.delete(`/usuarios/${id}/`)
    return response.status === 204
  }
}
