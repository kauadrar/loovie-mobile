import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';
import { ExploreContextData } from './Explore.types';

const ExploreContext = createContext<ExploreContextData>(
  {} as ExploreContextData,
);

export function ExploreProvider({ children }: PropsWithChildren) {
  const [isExploring, setIsExploring] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

  const value = useMemo(
    () => ({ isExploring, setIsExploring, query, setQuery, debouncedQuery }),
    [isExploring, setIsExploring, query, setQuery, debouncedQuery],
  );

  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  );
}

export function useExplore() {
  return useContext(ExploreContext);
}
