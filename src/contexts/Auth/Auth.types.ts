import { User } from '@/types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

export type AuthContextData = {
  user?: User | null;
  isLoadingUser: boolean;
  getMe: UseMutateAsyncFunction<User | null, Error, void, unknown>;
};
