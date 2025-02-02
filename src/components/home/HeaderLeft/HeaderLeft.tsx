import { colors } from '@/styles';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation, usePathname } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { CaretLeft } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export function HeaderLeft() {
  const pathname = usePathname();
  const navigation = useNavigation();

  const isOnTab = pathname === '/';

  return (
    <TouchableOpacity
      onPress={() =>
        isOnTab
          ? navigation.dispatch(DrawerActions.toggleDrawer())
          : router.back()
      }
      style={{ marginLeft: 12, paddingLeft: 4 }}
    >
      {isOnTab ? (
        <MenuIcon size={24} color={colors.gray1} />
      ) : (
        <CaretLeft size={24} color={colors.gray1} />
      )}
    </TouchableOpacity>
  );
}
