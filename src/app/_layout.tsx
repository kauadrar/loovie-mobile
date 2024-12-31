import { AuthProvider } from '@/contexts';
import { colors } from '@/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'expo-dev-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

SystemUI.setBackgroundColorAsync(colors.background);

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  navigationBarColor: colors.background,
                }}
              />
            </KeyboardProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
});
