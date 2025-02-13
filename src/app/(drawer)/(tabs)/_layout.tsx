import { BlurView } from '@/components/nativewind';
import { LoovieLogo } from '@/components/svgs';
import { useExplore } from '@/contexts';
import { colors } from '@/styles';
import { Tabs } from 'expo-router/tabs';
import { Bell, House, Popcorn, User } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainLayout() {
  const { setIsExploring } = useExplore();
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.gray1,
        tabBarActiveTintColor: colors.primary,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70 + bottomInset,
          borderTopWidth: 0,
          elevation: 1,
          position: 'absolute',
        },
        tabBarIconStyle: {
          padding: 22,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarBackground: () => (
          <BlurView
            className={Platform.select({
              ios: 'absolute top-0 left-0 right-0 bottom-0 bg-background/85',
              android:
                'absolute top-0 left-0 right-0 bottom-0 bg-background/95',
            })}
            experimentalBlurMethod="dimezisBlurView"
            blurReductionFactor={40}
            tint="dark"
            intensity={30}
          />
        ),
        headerPressOpacity: 0.5,
        headerPressColor: colors.gray2,
      }}
      screenListeners={({ navigation, route }) => ({
        tabPress: () => {
          if (route.name !== 'explore') {
            setIsExploring(false);
          }
        },
      })}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          href: '/(drawer)/(tabs)/(home)',
          tabBarIcon: ({ focused, color, size }) => (
            <House
              weight={focused ? 'fill' : 'regular'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cinema"
        options={{
          href: '/(drawer)/(tabs)/cinema',
          tabBarIcon: ({ focused, color, size }) => (
            <Popcorn
              weight={focused ? 'fill' : 'regular'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          href: '/(drawer)/(tabs)/recommendations',
          tabBarIcon: ({ size, color }) => (
            <LoovieLogo size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: '/(drawer)/(tabs)/notifications',
          tabBarIcon: ({ focused, color, size }) => (
            <Bell
              weight={focused ? 'fill' : 'regular'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my_profile"
        options={{
          href: '/(drawer)/(tabs)/my_profile',
          tabBarIcon: ({ focused, color, size }) => (
            <User
              weight={focused ? 'fill' : 'regular'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
