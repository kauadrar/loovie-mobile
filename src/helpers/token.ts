import { api } from '@/services';
import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string) {
  await SecureStore.setItemAsync('token', token);

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export async function getToken() {
  return await SecureStore.getItemAsync('token');
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync('token');

  delete api.defaults.headers.Authorization;
}
