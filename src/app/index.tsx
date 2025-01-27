import { useAuth } from '@/contexts';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function Root() {
  const { user, getMe } = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await getMe();

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
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [getMe]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (user) {
    return <Redirect href="/(drawer)/(tabs)/home" />;
  }

  return <Redirect href="/lobby" />;
}
