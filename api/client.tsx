import axios from 'axios';
import log from 'core/logger';
export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const setHeaderToken = (token: string) => {
  log.debug('set token', token);
  client.defaults.headers.common['Authorization'] = `Token ${token}`;
};
