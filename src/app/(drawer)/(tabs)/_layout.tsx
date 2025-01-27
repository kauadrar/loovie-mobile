import { LoovieLogo } from '@/components/svgs';
import { useExplore } from '@/contexts';
import { colors } from '@/styles';
import { Tabs } from 'expo-router/tabs';
import { Bell, House, Popcorn, User } from 'phosphor-react-native';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainLayout() {
  const { setIsExploring } = useExplore();
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.gray1,
        tabBarActiveTintColor: colors.primary,
        tabBarButton: ({ onPress, children, style }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[style as ViewStyle, { justifyContent: 'center' }]}
          >
            {children}
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 56 + bottomInset,
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 1,
        },
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
        name="home"
        options={{
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
          tabBarIcon: ({ size, color }) => (
            <LoovieLogo size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
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
          tabBarIcon: ({ focused, color, size }) => (
            <User
              weight={focused ? 'fill' : 'regular'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
}
