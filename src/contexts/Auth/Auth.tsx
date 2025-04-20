import { meRequest } from '@/requests';
import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import { AuthContextData } from './Auth.types';

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren) {
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: meRequest,
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
