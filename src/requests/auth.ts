import { api } from '@/services';
import { LoginParams, SignUpParams, User } from '@/types';

export const loginRequest = async (params: LoginParams) => {
  const { data } = await api.post<User>('/login', params);

  return data;
};

export const signUpRequest = async (params: SignUpParams) => {
  const { data } = await api.post<User>('/sign_up', params);

  return data;
};
