import { ReactNode } from 'react';

export type InputContainerProps = {
  label?: string;
  errorMessage?: string;
  value?: string | Date;
  children: ReactNode;
  disablePlaceholderAnimation?: boolean;
};
