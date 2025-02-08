import { IconWeight } from 'phosphor-react-native';
import { PressableProps } from 'react-native';

type Icon = {
  color?: string;
  size?: number;
  weight?: IconWeight;
};

export type DrawerButtonProps = {
  Icon: React.FC<Icon>;
  label: string;
  isFocused?: boolean;
  color?: string;
} & PressableProps;
