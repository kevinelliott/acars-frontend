import axios from 'axios';

import authHeader from './auth-header';

console.log(authHeader);

let remoteUrl;
if (process.env.NODE_ENV === 'production') {
  const appHost = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : 'api.airframes.io';
  const appPort = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : '443';
  remoteUrl = `https://${appHost}:${appPort}`;
} else {
  remoteUrl = 'http://localhost:3001';
}
const API_URL = `${remoteUrl}/user/stations`;

class UserStationService {
  save(station: any) { // eslint-disable-line class-methods-use-this
    return axios.post(
      `${API_URL}/${station.id}`,
      { station },
      { headers: authHeader() },
    );
  }
}

export default new UserStationService();
