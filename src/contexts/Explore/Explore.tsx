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

  const value = useMemo(
    () => ({ isExploring, setIsExploring }),
    [isExploring, setIsExploring],
  );

  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  );
}

export function useExplore() {
  return useContext(ExploreContext);
}
