import { logoutRequest } from '@/requests';
import { colors } from '@/styles';
import { FontVariant } from '@/types';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { SignOut } from 'phosphor-react-native';

const fontFamily: FontVariant = 'Urbanist-Regular';

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

  return (
    <DrawerContentScrollView>
      <DrawerItemList
        navigation={navigation}
        state={state}
        descriptors={descriptors}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{
          marginHorizontal: -4,
          fontFamily,
          color: colors.primary,
        }}
        icon={({ size }) => <SignOut size={size} color={colors.danger} />}
        onPress={logoutMutation}
      />
    </DrawerContentScrollView>
  );
}
