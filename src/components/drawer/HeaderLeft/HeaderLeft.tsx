import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation, usePathname } from 'expo-router';
import { MenuIcon } from 'lucide-react-native';
import { CaretLeft } from 'phosphor-react-native';
import React from 'react';
import { NonUndefined } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

export const HeaderLeft: NonUndefined<
  DrawerNavigationOptions['headerLeft']
> = ({ tintColor }) => {
  const pathname = usePathname();
  const navigation = useNavigation();

  const isOnTab = /^\/(cinema|notifications|recommendations|my_profile)?$/.test(
    pathname,
  );

  return (
    <TouchableOpacity
      onPress={() =>
        isOnTab
          ? navigation.dispatch(DrawerActions.toggleDrawer())
          : router.back()
      }
      style={{ marginLeft: 16 }}
    >
      {isOnTab ? (
        <MenuIcon size={24} color={tintColor} />
      ) : (
        <CaretLeft size={24} color={tintColor} />
      )}
    </TouchableOpacity>
  );
};
