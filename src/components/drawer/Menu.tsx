import { logoutRequest } from '@/requests';
import { colors } from '@/styles';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { BookmarkSimple, Gear, Question, SignOut } from 'phosphor-react-native';

const drawerItens: {
  name: string;
  title: string;
  icon: DrawerNavigationOptions['drawerIcon'];
}[] = [
  {
    name: '(app)/saved',
    title: 'Saved',
    icon: ({ color, focused, size }) => (
      <BookmarkSimple
        size={size}
        weight={focused ? 'fill' : 'regular'}
        color={color}
      />
    ),
  },
  {
    name: '(app)/help',
    title: 'Help',
    icon: ({ color, focused, size }) => (
      <Question
        size={size}
        weight={focused ? 'fill' : 'regular'}
        color={color}
      />
    ),
  },
  {
    name: '(app)/settings',
    title: 'Settings',
    icon: ({ color, focused, size }) => (
      <Gear size={size} weight={focused ? 'fill' : 'regular'} color={color} />
    ),
  },
];

export function Menu({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: async () => {
      queryClient.removeQueries();
      router.replace('/lobby');
    },
  });

  const options = Object.values(descriptors)[0].options;

  return (
    <DrawerContentScrollView>
      {drawerItens.map((item) => (
        <DrawerItem
          key={item.name}
          label={item.title}
          icon={item.icon}
          onPress={() =>
            navigation.navigate(item.name.split('/')[0], {
              screen: item.name.split('/')[1],
            })
          }
        />
      ))}
      <DrawerItem
        label="Logout"
        labelStyle={[options.drawerLabelStyle, { color: colors.danger }]}
        icon={({ size }) => <SignOut size={size} color={colors.danger} />}
        onPress={logoutMutation}
      />
    </DrawerContentScrollView>
  );
}
