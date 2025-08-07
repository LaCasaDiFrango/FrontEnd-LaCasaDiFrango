import axios from '@/plugins/axios';

export default class AuthService {
  async postUserToken() {
    const response = await axios.get("/usuarios/me/");
    return response.data;
  }
}
