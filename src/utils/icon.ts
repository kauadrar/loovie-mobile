import { Icon } from '@expo/vector-icons/build/createIconSet';
import { LucideIcon } from 'lucide-react-native';
import { IconProps } from 'phosphor-react-native';
import { FC } from 'react';
import { withUnistyles } from 'react-native-unistyles';

// type IconProps = {
//   color?: ColorValue;
//   size?: string | number;
// };

type IconComponent = FC<IconProps> | LucideIcon | Icon<any, any>;

export function unistyleIcon<T extends IconComponent>(Icon: IconComponent) {
  return withUnistyles(Icon, (theme) => ({
    color: theme.colors.gray1,
  })) as T;
}
