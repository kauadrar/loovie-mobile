import { HeaderRight } from '@/components/drawer';
import { colors } from '@/styles';
import { FontVariant } from '@/types';
import { Route } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { Menu } from 'lucide-react-native';
import { BookmarkSimple, Gear, Question } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MainLayout() {
  const fontRegular: FontVariant = 'Urbanist-Regular';
  const fontMedium: FontVariant = 'Urbanist-Medium';

  return (
    <Drawer
      screenOptions={({ route, navigation }) => {
        const state = navigation.getState();
        const isRouteFocused =
          state.index ===
          state.routes.findIndex((r: Route<string>) => r.name === route.name);

        return {
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 1,
            shadowOpacity: 0,
          },
          headerTintColor: colors.gray1,
          headerTitleStyle: {
            display: 'none',
          },
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity
              onPress={navigation.toggleDrawer}
              style={{ marginLeft: 16 }}
            >
              <Menu size={24} color={tintColor} />
            </TouchableOpacity>
          ),
          headerRight: HeaderRight,
          drawerStyle: {
            backgroundColor: colors.background,
            width: 200,
          },
          drawerItemStyle: {
            display: route.name === '(tabs)' ? 'none' : 'flex',
          },
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.gray1,
          drawerActiveBackgroundColor: colors.gray2,
          drawerLabelStyle: {
            marginHorizontal: -24,
            fontFamily: isRouteFocused ? fontMedium : fontRegular,
          },
        };
      }}
    >
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
