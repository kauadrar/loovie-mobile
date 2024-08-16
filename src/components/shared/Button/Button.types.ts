import { TouchableOpacityProps } from 'react-native';

export type ButtonProps = {
  label: string;
  href?: string;
} & TouchableOpacityProps;
