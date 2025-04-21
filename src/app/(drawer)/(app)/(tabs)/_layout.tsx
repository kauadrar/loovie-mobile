import { LoovieLogo, Theater } from '@/components/icons';
import { TabBar } from '@/components/tabs/TabBar';
import { useExplore } from '@/contexts';
import { colors } from '@/styles';
import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type {
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Bell, House, User } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MainLayout() {
  const { setIsExploring } = useExplore();
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <MaterialTopTabs
      screenListeners={({ navigation, route }) => ({
        tabPress: () => {
          if (route.name !== 'explore') {
            setIsExploring(false);
          }
        },
      })}
      tabBar={TabBar}
      screenOptions={{
        animationEnabled: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray1,
        tabBarStyle: {
          paddingBottom: bottomInset,
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarItemStyle: {
          height: 90,
          justifyContent: 'flex-start',
        },
        tabBarIndicatorContainerStyle: {
          height: 90,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}
      tabBarPosition="bottom"
    >
      <MaterialTopTabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              size={24}
              weight={focused ? 'fill' : 'regular'}
            />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="cinema"
        options={{
          title: 'Cinema',
          tabBarIcon: ({ color, focused }) => (
            <Theater fill={color} size={24} filled={focused} />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="recommendations"
        options={{
          title: 'Loovie',
          tabBarIcon: ({ color }) => <LoovieLogo color={color} size={24} />,
        }}
      />
      <MaterialTopTabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <Bell
              color={color}
              size={24}
              weight={focused ? 'fill' : 'regular'}
            />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="my_profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User
              color={color}
              size={24}
              weight={focused ? 'fill' : 'regular'}
            />
          ),
        }}
      />
    </MaterialTopTabs>
  );
}
