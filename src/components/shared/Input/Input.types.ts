import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export type InputProps = {
  preffix?: ReactNode;
  suffix?: ReactNode;
  type?: 'text' | 'password' | 'area';
  errorMessage?: string;
} & TextInputProps;