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

// Helper function to set timezone header
export const setHeaderTimezone = (timezone?: string) => {
  if (timezone) {
    client.defaults.headers.common['X-Timezone'] = timezone;
  } else {
    delete client.defaults.headers.common['X-Timezone'];
  }
};
