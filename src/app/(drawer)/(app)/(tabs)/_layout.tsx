import bellFill from '@/assets/icons/bell-fill.png';
import bell from '@/assets/icons/bell.png';
import filmFill from '@/assets/icons/film-fill.png';
import film from '@/assets/icons/film.png';
import homeFill from '@/assets/icons/home-fill.png';
import home from '@/assets/icons/home.png';
import loovieLogo from '@/assets/icons/logo.png';
import personFill from '@/assets/icons/person-fill.png';
import person from '@/assets/icons/person.png';
import { useExplore } from '@/contexts';
import { colors } from '@/styles';
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from '@bottom-tabs/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Platform, View } from 'react-native';

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);

export default function MainLayout() {
  const { setIsExploring } = useExplore();

  return (
    <Tabs
      screenListeners={({ navigation, route }) => ({
        tabPress: () => {
          if (route.name !== 'explore') {
            setIsExploring(false);
          }
        },
      })}
      translucent
      tabBarActiveTintColor={colors.primary}
      tabBarInactiveTintColor={colors.gray1}
      tabBarStyle={{
        backgroundColor: colors.background,
      }}
      screenLayout={({ children }) => (
        <View className="flex-1 bg-background">{children}</View>
      )}
      activeIndicatorColor={`${colors.primary}22`}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                sfSymbol: focused ? 'house.fill' : 'house',
              },
              android: focused ? homeFill : home,
            }),
        }}
      />
      <Tabs.Screen
        name="cinema"
        options={{
          title: 'Cinema',
          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                sfSymbol: focused ? 'film.fill' : 'film',
              },
              android: focused ? filmFill : film,
            }),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: 'Loovie',
          tabBarIcon: () => loovieLogo,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                sfSymbol: focused ? 'bell.fill' : 'bell',
              },
              android: focused ? bellFill : bell,
            }),
        }}
      />
      <Tabs.Screen
        name="my_profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) =>
            Platform.select({
              ios: {
                sfSymbol: focused ? 'person.fill' : 'person',
              },
              android: focused ? personFill : person,
            }),
        }}
      />
    </Tabs>
  );
}
