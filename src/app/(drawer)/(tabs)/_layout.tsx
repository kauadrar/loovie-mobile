import { LoovieLogo } from '@/components/svgs';
import { colors } from '@/styles';
import { Tabs } from 'expo-router/tabs';
import { Bell, House, Popcorn, User } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.gray1,
        tabBarActiveTintColor: colors.primary,
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 1,
        },
      }}
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
    </Tabs>
  );
}
