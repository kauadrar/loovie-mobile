import { meRequest } from '@/requests';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { SplashScreen } from 'expo-router';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AuthContextData } from './Auth.types';

const AuthContext = createContext({} as AuthContextData);

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null | undefined>(null);
  const { mutateAsync: getMe, isPending: isLoadingUser } = useMutation({
    mutationKey: ['users', 'me'],
    mutationFn: meRequest,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const value = useMemo(
    () => ({
      user,
      isLoadingUser,
      getMe,
    }),
    [user, isLoadingUser, getMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
