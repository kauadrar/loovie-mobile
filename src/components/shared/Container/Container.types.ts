import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type ContainerProps = {
  safeArea?: boolean;
  headerLeft?: () => JSX.Element;
  headerRight?: () => JSX.Element;
} & SafeAreaViewProps;
