import axios from 'axios';

const API_URL = 'http://localhost:3001/auth/';
// const API_URL = 'https://api.airframes.io/auth/';

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
