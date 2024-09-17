import { getToken, saveToken } from '@/helpers';
import { api } from '@/services';
import { AuthResponse, LoginParams, SignUpParams, User } from '@/types';

export const loginRequest = async (params: LoginParams) => {
  const {
    data,
    headers: { 'access-token': token },
  } = await api.post<User, AuthResponse>('/login', params);

  await saveToken(token);

  return data;
};

export const signUpRequest = async (params: SignUpParams) => {
  console.log('TESTEE SIGNUP', params);
  const {
    data,
    headers: { 'access-token': token },
  } = await api.post<User, AuthResponse>('/sign_up', params);

  await saveToken(token);

  return data;
};

export const meRequest = async () => {
  const token = await getToken();

  if (!token) {
    return null;
  }

  api.defaults.headers.Authorization = `Bearer ${token}`;

  const { data } = await api.get<User>('/me');

  return data;
};
