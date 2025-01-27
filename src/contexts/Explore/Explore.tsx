import { getTitlesRequest } from '@/requests/titles';
import { useMutation } from '@tanstack/react-query';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ExploreContextData } from './Explore.types';

const ExploreContext = createContext<ExploreContextData>(
  {} as ExploreContextData,
);

export function ExploreProvider({ children }: PropsWithChildren) {
  const [isExploring, setIsExploring] = useState(false);
  const [query, setQuery] = useState('');
  const {
    mutateAsync: getTitles,
    data: titles,
    isPending: isLoadingTitles,
  } = useMutation({
    mutationKey: ['titles'],
    mutationFn: async (query: string) => await getTitlesRequest(query),
  });

  const value = useMemo(
    () => ({
      isExploring,
      setIsExploring,
      query,
      setQuery,
      getTitles,
      titles,
      isLoadingTitles,
    }),
    [
      isExploring,
      setIsExploring,
      query,
      setQuery,
      getTitles,
      titles,
      isLoadingTitles,
    ],
  );

  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  );
}

export function useExplore() {
  return useContext(ExploreContext);
}
