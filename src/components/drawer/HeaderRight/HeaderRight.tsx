import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { MagnifyingGlass, Plus } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const HeaderRight: DrawerNavigationOptions['headerRight'] = ({
  tintColor,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MagnifyingGlass size={24} weight="regular" color={tintColor} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Plus size={24} weight="regular" color={tintColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginRight: 16,
  },
});
