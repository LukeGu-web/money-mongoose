import axios from 'axios';
import log from 'core/logger';
export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const setHeaderToken = (token: string | null) => {
  log.debug('set token', token);
  if (token) {
    client.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete client.defaults.headers.common['Authorization'];
  }
};
