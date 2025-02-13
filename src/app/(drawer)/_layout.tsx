import { Menu } from '@/components/drawer';
import { BlurView } from '@/components/nativewind';
import { colors } from '@/styles';
import { FontVariant } from '@/types';
import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { BookmarkSimple, Gear, Question } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DrawerLayout() {
  const { data: user } = useQuery({ queryKey: ['me'] });
  const fontRegular: FontVariant = 'urbanist-regular';
  const fontMedium: FontVariant = 'urbanist-medium';
  const { top: topInset } = useSafeAreaInsets();

  if (!user) {
    return <Redirect href="/lobby" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <Menu {...props} />}
      backBehavior="history"
      screenOptions={({ route, navigation }) => {
        const state = navigation.getState();
        const isRouteFocused =
          state.index ===
          state.routes.findIndex((r: Route<string>) => r.name === route.name);

        return {
          drawerStyle: {
            backgroundColor: colors.background,
            width: 200,
          },
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.gray1,
          drawerActiveBackgroundColor: colors.gray2,
          drawerLabelStyle: {
            marginHorizontal: -4,
            fontFamily: isRouteFocused ? fontMedium : fontRegular,
          },
          headerTitle: '',
          headerTransparent: true,
          headerStyle: {
            height: topInset + 50,
          },
          headerBackground: () => (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              blurReductionFactor={40}
              tint="dark"
              intensity={30}
              className={Platform.select({
                ios: 'absolute top-0 left-0 right-0 bottom-0 bg-background/85',
                android:
                  'absolute top-0 left-0 right-0 bottom-0 bg-background/95',
              })}
            />
          ),
        };
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: 'Saved',
          drawerIcon: ({ color, focused, size }) => (
            <BookmarkSimple
              size={size}
              weight={focused ? 'fill' : 'regular'}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color, focused, size }) => (
            <Gear
              size={size}
              weight={focused ? 'fill' : 'regular'}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: 'Help',
          drawerIcon: ({ color, focused, size }) => (
            <Question
              size={size}
              weight={focused ? 'fill' : 'regular'}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}
