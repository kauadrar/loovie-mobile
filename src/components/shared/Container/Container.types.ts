import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type ContainerProps = {
  safeArea?: boolean;
  hasBottomTabs?: boolean;
  hasHeader?: boolean;
} & SafeAreaViewProps;
