import { deleteToken, getToken, saveToken } from '@/helpers';
import { api } from '@/services';
import { AuthResponse, LoginParams, SignUpParams, User } from '@/types';

export const loginRequest = async (params: LoginParams) => {
  const {
    data,
    headers: { authorization },
  } = await api.post<User, AuthResponse>('/login', { user: params });

  const token = authorization.split('Bearer ')[1];
  await saveToken(token);

  return data;
};

export const signUpRequest = async (params: SignUpParams) => {
  const {
    data,
    headers: { authorization },
  } = await api.post<User, AuthResponse>('/signup', { user: params });

  const token = authorization.split('Bearer ')[1];
  await saveToken(token);

  return data;
};

export const meRequest = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const authorization = `Bearer ${token}`;

    api.defaults.headers.Authorization = authorization;

    const { data } = await api.get<User>('/me', {
      headers: {
        Authorization: authorization,
      },
    });

    return data;
  } catch {
    deleteToken();

    throw new Error('Invalid token');
  }
};

export const logoutRequest = async () => {
  await api.delete('/logout');
  await deleteToken();
};
