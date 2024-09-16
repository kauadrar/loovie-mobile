import { ReactNode } from 'react';
import { TextInputProps } from 'react-native';

export type DateInputProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: 'text' | 'password' | 'area';
  errorMessage?: string;
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
} & Omit<TextInputProps, 'value' | 'onChange'>;
