import { TabTriggerSlotProps } from 'expo-router/ui';
import { IconWeight } from 'phosphor-react-native';

type Icon = {
  color?: string;
  size?: number;
  weight?: IconWeight;
};

export type TabButtonProps = TabTriggerSlotProps & {
  Icon: React.FC<Icon>;
  rounded?: boolean;
};
