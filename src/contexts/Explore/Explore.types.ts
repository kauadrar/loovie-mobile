import { Dispatch, SetStateAction } from 'react';

export type ExploreContextData = {
  isExploring: boolean;
  setIsExploring: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  debouncedQuery: string;
};
