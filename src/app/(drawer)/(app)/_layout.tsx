import { defaultStackOptions } from '@/config';
import { colors } from '@/styles';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function AppLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        ...defaultStackOptions,
        headerShown: route.name === '(tabs)' ? false : true,
        contentStyle: { backgroundColor: colors.background },
      })}
    />
  );
}
