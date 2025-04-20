import { AuthProvider } from '@/contexts';
import { ExploreProvider } from '@/contexts/Explore/Explore';
import { meRequest } from '@/requests';
import { colors } from '@/styles';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'expo-dev-client';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useEffect, useState } from 'react';
import { SystemBars } from 'react-native-edge-to-edge';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import '../../global.css';

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
        await queryClient.fetchQuery({ queryKey: ['me'], queryFn: meRequest });
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
            <GestureHandlerRootView className="grow bg-background">
              <BottomSheetModalProvider>
                <KeyboardProvider>
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
                      <SystemBars style="light" />
                      <FlashMessage
                        position="top"
                        titleStyle={{ fontFamily: 'Urbanist-Medium' }}
                        statusBarHeight={topInset}
                      />
                      <Stack screenOptions={{ headerShown: false }} />
                    </PortalProvider>
                  </ThemeProvider>
                </KeyboardProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </ExploreProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
