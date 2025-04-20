import { Menu } from '@/components/drawer';
import { meRequest } from '@/requests';
import { colors } from '@/styles';
import { FontVariant } from '@/types';
import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: meRequest });
  const fontRegular: FontVariant = 'urbanist-regular';
  const fontMedium: FontVariant = 'urbanist-medium';

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
          headerShown: false,
        };
      }}
    />
  );
}
