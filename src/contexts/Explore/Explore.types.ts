import { Title } from '@/types';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export type ExploreContextData = {
  isExploring: boolean;
  setIsExploring: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  getTitles: UseMutateAsyncFunction<Title[], Error, string, unknown>;
  titles?: Title[];
  isLoadingTitles: boolean;
};
