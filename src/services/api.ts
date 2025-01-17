import { API_URL } from '@/constants';
import axios from 'axios';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'pt-BR',
  },
});
