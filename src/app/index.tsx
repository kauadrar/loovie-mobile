import { useAuth } from '@/contexts';
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function Root() {
  const { user, isLoadingUser } = useAuth();
  const [loaded] = useFonts({
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

  useEffect(() => {
    if (loaded && !isLoadingUser) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoadingUser]);

  if (!loaded || isLoadingUser) {
    return null;
  }

  if (user) {
    return <Redirect href="/(main)/home" />;
  }

  return <Redirect href="/lobby" />;
}
