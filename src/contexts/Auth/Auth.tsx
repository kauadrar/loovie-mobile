import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { SplashScreen } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { AuthContextData } from './Auth.types';

const AuthContext = createContext({} as AuthContextData);

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
  const { data: user } = useQuery<User>({
    queryKey: ['users', 'me'],
  });

  const value = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
