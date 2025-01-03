import { useExplore } from '@/contexts/Explore/Explore';
import { colors } from '@/styles';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { MagnifyingGlass } from 'phosphor-react-native';
import React, { useRef } from 'react';
import { NonUndefined } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const HeaderRight: NonUndefined<
  DrawerNavigationOptions['headerRight']
> = ({ tintColor }) => {
  const { isExploring, setIsExploring } = useExplore();
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    setIsExploring(true);
    setTimeout(() => inputRef?.current?.focus(), 0);
    router.push('/(drawer)/(tabs)/explore');
  };

  return (
    <View
      style={[
        styles.container,
        isExploring && {
          borderBottomColor: colors.gray1,
          borderBottomWidth: 1,
        },
      ]}
    >
      <TextInput
        ref={inputRef}
        style={[styles.searchInput, isExploring && { display: 'flex' }]}
        placeholder="Search"
        placeholderTextColor={colors.gray1}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handlePress}>
        <MagnifyingGlass size={24} weight="regular" color={tintColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginRight: 12,
    paddingRight: 4,
    marginLeft: 6,
  },
  searchButton: {},
  searchInput: {
    height: 40,
    display: 'none',
    flex: 1,
    color: colors.white,
    paddingLeft: 6,
  },
});
