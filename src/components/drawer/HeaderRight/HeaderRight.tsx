import { Text } from '@/components/shared';
import { useExplore } from '@/contexts/Explore/Explore';
import { getTitlesAutocompleteRequest } from '@/requests/titles';
import { colors } from '@/styles';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import { MagnifyingGlass, X } from 'phosphor-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { NonUndefined } from 'react-hook-form';
import {
  Dimensions,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useDebounce } from 'use-debounce';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export const HeaderRight: NonUndefined<
  DrawerNavigationOptions['headerRight']
> = ({ tintColor }) => {
  const { isExploring, setIsExploring, query, setQuery, getTitles } =
    useExplore();
  const inputRef = useRef<TextInput>(null);
  const [debouncedQuery] = useDebounce(query, 500);
  const { data: titlesAutocomplete } = useQuery({
    queryKey: ['titles', 'autocomplete', debouncedQuery],
    queryFn: async () => await getTitlesAutocompleteRequest(query),
  });
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
  const pathname = usePathname();

  const handlePress = () => {
    setIsExploring(true);
    setTimeout(() => inputRef?.current?.focus(), 0);
  };

  const clearQuery = () => {
    setQuery('');
    onSubmit('');
  };

  const closeAutocomplete = useCallback(() => {
    setIsAutocompleteVisible(false);
  }, []);

  const blur = useCallback(() => {
    inputRef.current?.blur();
    closeAutocomplete();
    if (!pathname.includes('explore')) {
      setQuery('');
      setIsExploring(false);
    }
  }, [closeAutocomplete, pathname, setQuery, setIsExploring]);

  const onSubmit = useCallback(
    async (value?: string) => {
      router.push('/(drawer)/(tabs)/explore');
      inputRef.current?.blur();
      closeAutocomplete();
      await getTitles(value === undefined ? query : value);

      if (value) {
        setQuery(value);
      }
    },
    [getTitles, query, setQuery, closeAutocomplete],
  );

  const onFocus = useCallback(() => {
    if (query) {
      setIsAutocompleteVisible(true);
    }
  }, [query]);

  const searchItem = useCallback(
    async (value: string) => {
      await onSubmit(value);
    },
    [onSubmit],
  );

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.autocompleteItem}
        onPress={async () => await searchItem(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    ),
    [searchItem],
  );

  const onChangeText = (value: string) => {
    setQuery(value);
    if (value) {
      setIsAutocompleteVisible(true);
    }
  };

  return (
    <>
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
          onFocus={onFocus}
          onChangeText={onChangeText}
          onSubmitEditing={async () => await onSubmit()}
          returnKeyType="search"
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
      {isAutocompleteVisible && !!titlesAutocomplete?.length && (
        <BlurView style={styles.autocompleteContainer} intensity={10}>
          <TouchableWithoutFeedback
            onPress={blur}
            style={{ height: HEIGHT - 42 }}
          >
            <View style={styles.autocomplete}>
              <FlatList
                data={titlesAutocomplete}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
              />
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      )}
    </>
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
    height: 42,
    backgroundColor: colors.background,
  },
  searchInput: {
    height: 40,
    display: 'none',
    flex: 1,
    color: colors.white,
    paddingLeft: 6,
  },
  autocompleteContainer: {
    height: HEIGHT - 42,
    position: 'absolute',
    width: WIDTH,
    right: -5,
    top: 41,
  },
  autocomplete: {
    backgroundColor: colors.background,
    maxHeight: HEIGHT * 0.6,
    paddingBottom: 14,
    paddingTop: 8,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  autocompleteItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
