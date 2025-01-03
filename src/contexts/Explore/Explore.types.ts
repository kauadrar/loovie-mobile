import { Dispatch, SetStateAction } from 'react';

export type ExploreContextData = {
  isExploring: boolean;
  setIsExploring: Dispatch<SetStateAction<boolean>>;
};
