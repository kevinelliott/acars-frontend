import axios from 'axios';

let remoteUrl;
if (process.env.NODE_ENV === 'production') {
  remoteUrl = `https://${appHost}:${appPort}`;
} else {
  remoteUrl = 'http://localhost:3001';
}
const API_URL = `${remoteUrl}/auth/`;

class AuthService {
  login(user: any) { // eslint-disable-line class-methods-use-this
    console.log(user);
    return axios
      .post(`${API_URL}login`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        }

        return response.data;
      });
  }

  logout() { // eslint-disable-line class-methods-use-this
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }

  register(user: any) { // eslint-disable-line class-methods-use-this
    return axios.post(`${API_URL}register`, {
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
