import axios from 'axios';
export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const setHeaderToken = (token: string) => {
  console.log('set token', token);
  client.defaults.headers.common['Authorization'] = `Token ${token}`;
};
