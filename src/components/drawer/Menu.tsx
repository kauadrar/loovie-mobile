import { logoutRequest } from '@/requests';
import { colors } from '@/styles';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { SignOut } from 'phosphor-react-native';

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
      <DrawerItemList
        navigation={navigation}
        state={state}
        descriptors={descriptors}
      />
      <DrawerItem
        label="Logout"
        labelStyle={[options.drawerLabelStyle, { color: colors.danger }]}
        icon={({ size }) => <SignOut size={size} color={colors.danger} />}
        onPress={logoutMutation}
      />
    </DrawerContentScrollView>
  );
}
