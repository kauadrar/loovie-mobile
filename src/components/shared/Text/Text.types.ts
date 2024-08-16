import { TextProps as RNTextProps } from 'react-native';
import { FontFamily, FontWeight } from '@/types';

export type TextProps = {
  family?: FontFamily;
  weight?: FontWeight;
} & RNTextProps;
