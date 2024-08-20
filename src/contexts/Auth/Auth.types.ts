import { User } from '@/types';

export type AuthContextData = {
  user?: User | null;
  isLoadingUser: boolean;
};
