import { HeaderOptions } from '@react-navigation/elements';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type ContainerProps = {
  safeArea?: boolean;
  headerLeft?: HeaderOptions['headerLeft'];
  headerRight?: HeaderOptions['headerRight'];
} & SafeAreaViewProps;
