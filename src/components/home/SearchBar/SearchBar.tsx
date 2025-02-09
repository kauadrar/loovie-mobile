import { Text } from '@/components/shared';
import { useExplore } from '@/contexts/Explore/Explore';
import { getTitlesAutocompleteRequest } from '@/requests/titles';
import { colors } from '@/styles';
import { Portal } from '@gorhom/portal';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import { Faders, MagnifyingGlass, X } from 'phosphor-react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, ListRenderItem, View } from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';
import { BlurBackground } from '../BlurBackground/BlurBackground';
import { BlurBackgroundRef } from '../BlurBackground/BlurBackground.types';
import { styles } from './SearchBar.styles';

const { height: HEIGHT } = Dimensions.get('window');
const AUTOCOMPLETE_MAX_HEIGHT = HEIGHT * 0.55;

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function SearchBar() {
  const blurBackgroundRef = useRef<BlurBackgroundRef>(null);
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
  const autocompleteHeight = useSharedValue(0);
  const isOnExplore = pathname.includes('explore');
  const autocompleteHeightValue = useMemo(() => {
    const titlesAutocompleteLength = titlesAutocomplete?.length || 0;
    const entireAutocompleteHeight =
      titlesAutocompleteLength * 25 +
      (titlesAutocompleteLength - 1) * 17 +
      8 +
      16;

    return Math.min(entireAutocompleteHeight, AUTOCOMPLETE_MAX_HEIGHT);
  }, [titlesAutocomplete]);

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
    setTimeout(() => {
      blurBackgroundRef.current?.hide(() => {
        runOnJS(setIsAutocompleteVisible)(false);
      });
    }, 0);
  }, [autocompleteHeight]);

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
      router.navigate('/explore');
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

  const autocompleteAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      autocompleteHeight.value,
      [0, autocompleteHeightValue],
      [0, 1],
    );

    return {
      height: autocompleteHeight.value,
      opacity,
    };
  });

  useEffect(() => {
    if (isAutocompleteVisible && !!titlesAutocomplete?.length) {
      autocompleteHeight.value = withTiming(autocompleteHeightValue, {
        duration: 300,
      });
      setTimeout(() => {
        blurBackgroundRef.current?.show();
      }, 0);
    }
  }, [
    isAutocompleteVisible,
    titlesAutocomplete,
    autocompleteHeight,
    autocompleteHeightValue,
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
              <X size={24} weight="regular" color={colors.gray1} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePress}>
              <MagnifyingGlass
                size={24}
                weight="regular"
                color={colors.gray1}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity>
          <Faders size={24} weight="regular" color={colors.gray1} />
        </TouchableOpacity>
      </View>
      {isAutocompleteVisible && !!titlesAutocomplete?.length && (
        <Portal>
          <BlurBackground ref={blurBackgroundRef} onPress={blur} />
          <Animated.View
            style={[
              styles.autocomplete,
              { top: 50 + topInset },
              autocompleteAnimatedStyles,
            ]}
          >
            <BlurView
              style={[
                styles.autocompleteBlur,
                { height: autocompleteHeightValue },
              ]}
              experimentalBlurMethod="dimezisBlurView"
              blurReductionFactor={100}
              tint="dark"
              intensity={40}
            >
              <FlatList
                data={titlesAutocomplete}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
              />
            </BlurView>
          </Animated.View>
        </Portal>
      )}
    </>
  );
}
