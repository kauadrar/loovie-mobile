import { Text } from '@/components/shared';
import { useExplore } from '@/contexts/Explore/Explore';
import { getTitlesAutocompleteRequest } from '@/requests/titles';
import { colors } from '@/styles';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { useQuery } from '@tanstack/react-query';
import { BlurView, BlurViewProps } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import { Faders, MagnifyingGlass, X } from 'phosphor-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NonUndefined } from 'react-hook-form';
import {
  Dimensions,
  ListRenderItem,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const AUTOCOMPLETE_MAX_HEIGHT = HEIGHT * 0.55;

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

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
  const { top: topInset } = useSafeAreaInsets();
  const blurIntensity = useSharedValue(0);
  const autocompleteHeight = useSharedValue(0);
  const isOnExplore = pathname.includes('explore');

  const handlePress = () => {
    setIsExploring(true);
    setTimeout(() => inputRef?.current?.focus(), 0);
  };

  const clearQuery = () => {
    setQuery('');
    if (isOnExplore) {
      onSubmit('');
    }
  };

  const closeAutocomplete = useCallback(() => {
    autocompleteHeight.value = withTiming(0, { duration: 300 });
    blurIntensity.value = withTiming(0, { duration: 600 }, () => {
      runOnJS(setIsAutocompleteVisible)(false);
    });
  }, [blurIntensity, autocompleteHeight]);

  const blur = useCallback(() => {
    inputRef.current?.blur();
    closeAutocomplete();
    if (!isOnExplore) {
      setQuery('');
      setIsExploring(false);
    }
  }, [closeAutocomplete, setQuery, setIsExploring, isOnExplore]);

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

  const blurViewAnimatedProps = useAnimatedProps<BlurViewProps>(() => {
    return {
      intensity: blurIntensity.value,
    };
  });

  const autocompleteAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      autocompleteHeight.value,
      [0, AUTOCOMPLETE_MAX_HEIGHT],
      [0, 1],
    );

    return {
      maxHeight: autocompleteHeight.value,
      opacity,
    };
  });

  useEffect(() => {
    if (isAutocompleteVisible && !!titlesAutocomplete?.length) {
      autocompleteHeight.value = withTiming(AUTOCOMPLETE_MAX_HEIGHT, {
        duration: 300,
      });
      blurIntensity.value = withTiming(30, { duration: 600 });
    }
  }, [
    isAutocompleteVisible,
    titlesAutocomplete,
    blurIntensity,
    autocompleteHeight,
  ]);

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.searchBar,
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
        <TouchableOpacity>
          <Faders size={24} weight="regular" color={tintColor} />
        </TouchableOpacity>
      </View>
      {isAutocompleteVisible && !!titlesAutocomplete?.length && (
        <AnimatedBlurView
          animatedProps={blurViewAnimatedProps}
          style={[
            styles.autocompleteContainer,
            Platform.OS === 'android' && { top: 32 + topInset },
          ]}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={10}
          tint="systemMaterialDark"
        >
          <TouchableWithoutFeedback
            onPress={blur}
            style={{ height: HEIGHT - 42 }}
          >
            <Animated.View
              style={[styles.autocomplete, autocompleteAnimatedStyles]}
            >
              <FlatList
                data={titlesAutocomplete}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </AnimatedBlurView>
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
    width: WIDTH - 68,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginLeft: 6,
    height: 42,
    flex: 1,
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
    height: HEIGHT,
    position: 'absolute',
    width: WIDTH,
    right: Platform.OS === 'ios' ? -5 : 0,
    top: 40,
  },
  autocomplete: {
    backgroundColor: colors.background,
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
