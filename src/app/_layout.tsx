import { AuthProvider } from '@/contexts';
import { ExploreProvider } from '@/contexts/Explore/Explore';
import { meRequest } from '@/requests';
import { colors } from '@/styles';
import { PortalProvider } from '@gorhom/portal';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'expo-dev-client';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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

SystemUI.setBackgroundColorAsync(colors.background).catch(() => {});

SplashScreen.preventAutoHideAsync().catch(() => {});

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { top: topInset } = useSafeAreaInsets();

  useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS === 'android') {
          await NavigationBar.setPositionAsync('absolute');
          await NavigationBar.setBackgroundColorAsync('#ffffff00');
        }

        await Font.loadAsync({
          'Urbanist-Thin': require('../assets/fonts/Urbanist-Thin.ttf'),
          'Urbanist-ExtraLight': require('../assets/fonts/Urbanist-ExtraLight.ttf'),
          'Urbanist-Light': require('../assets/fonts/Urbanist-Light.ttf'),
          'Urbanist-Regular': require('../assets/fonts/Urbanist-Regular.ttf'),
          'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
          'Urbanist-SemiBold': require('../assets/fonts/Urbanist-SemiBold.ttf'),
          'Urbanist-Bold': require('../assets/fonts/Urbanist-Bold.ttf'),
          'Urbanist-ExtraBold': require('../assets/fonts/Urbanist-ExtraBold.ttf'),
          'Urbanist-Black': require('../assets/fonts/Urbanist-Black.ttf'),
        });

        queryClient.setQueryDefaults(['me'], {
          queryFn: meRequest,
        });
        await queryClient.fetchQuery({ queryKey: ['me'] });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayout}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ExploreProvider>
            <GestureHandlerRootView style={styles.container}>
              <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
                <ThemeProvider
                  value={{
                    ...DarkTheme,
                    colors: {
                      ...DarkTheme.colors,
                      background: colors.background,
                    },
                  }}
                >
                  <PortalProvider>
                    <StatusBar style="light" />
                    <FlashMessage
                      position="top"
                      titleStyle={{ fontFamily: 'Urbanist-Medium' }}
                      statusBarHeight={topInset}
                    />
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        navigationBarTranslucent: true,
                        navigationBarColor: '#ffffff00',
                      }}
                    />
                  </PortalProvider>
                </ThemeProvider>
              </KeyboardProvider>
            </GestureHandlerRootView>
          </ExploreProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
});
