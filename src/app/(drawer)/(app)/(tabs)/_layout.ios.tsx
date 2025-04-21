import loovieLogo from '@/assets/icons/logo.png';
import { useExplore } from '@/contexts';
import { colors } from '@/styles';
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationEventMap,
  NativeBottomTabNavigationOptions,
} from '@bottom-tabs/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

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
      activeIndicatorColor={`${colors.primary}22`}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'house.fill' : 'house',
          }),
        }}
      />
      <Tabs.Screen
        name="cinema"
        options={{
          title: 'Cinema',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'film.fill' : 'film',
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
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'bell.fill' : 'bell',
          }),
        }}
      />
      <Tabs.Screen
        name="my_profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? 'person.fill' : 'person',
          }),
        }}
      />
    </Tabs>
  );
}
