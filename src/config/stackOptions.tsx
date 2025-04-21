import { colors } from '@/styles';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultStackOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerBackButtonDisplayMode: 'generic',
};
