import { meRequest } from '@/requests';
import { useMutation } from '@tanstack/react-query';
import { SplashScreen } from 'expo-router';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { AuthContextData } from './Auth.types';

const AuthContext = createContext({} as AuthContextData);

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
  const {
    mutateAsync: getMe,
    data: user,
    isPending: isLoadingUser,
  } = useMutation({
    mutationKey: ['users', 'me'],
    mutationFn: meRequest,
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
