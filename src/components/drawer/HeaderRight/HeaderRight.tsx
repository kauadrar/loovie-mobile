import { useExplore } from '@/contexts/Explore/Explore';
import { colors } from '@/styles';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { MagnifyingGlass, X } from 'phosphor-react-native';
import React, { useRef } from 'react';
import { NonUndefined } from 'react-hook-form';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window');

export const HeaderRight: NonUndefined<
  DrawerNavigationOptions['headerRight']
> = ({ tintColor }) => {
  const { isExploring, setIsExploring, query, setQuery } = useExplore();
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    setIsExploring(true);
    setTimeout(() => inputRef?.current?.focus(), 0);
    router.push('/(drawer)/(tabs)/explore');
  };

  const clearQuery = () => {
    setQuery('');
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
        value={query}
        onChangeText={setQuery}
      />
      {query ? (
        <TouchableOpacity onPress={clearQuery}>
          <X size={24} weight="regular" color={tintColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <MagnifyingGlass size={24} weight="regular" color={tintColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginRight: 12,
    paddingRight: 4,
    marginLeft: 6,
    width: WIDTH - 68,
  },
  searchInput: {
    height: 40,
    display: 'none',
    flex: 1,
    color: colors.white,
    paddingLeft: 6,
  },
});
