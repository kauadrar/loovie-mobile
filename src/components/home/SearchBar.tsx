import { BlurView } from '@/components/nativewind';
import { Text } from '@/components/shared';
import { useExplore } from '@/contexts/Explore/Explore';
import { getTitlesAutocompleteRequest } from '@/requests/titles';
import { colors } from '@/styles';
import { Portal } from '@gorhom/portal';
import { useQuery } from '@tanstack/react-query';
import { router, usePathname } from 'expo-router';
import { cssInterop } from 'nativewind';
import { Faders, MagnifyingGlass, X } from 'phosphor-react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  ListRenderItem,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';
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
import { useDebounce } from 'use-debounce';
import { BlurBackground, BlurBackgroundRef } from './BlurBackground';

const { height: HEIGHT } = Dimensions.get('window');
const AUTOCOMPLETE_MAX_HEIGHT = HEIGHT * 0.55;

const StyledTouchableOpacity = cssInterop(TouchableOpacity, {
  className: 'style',
});

function ItemSeparator() {
  return <View className="border-hairline border-gray-500 m-2" />;
}

export function SearchBar() {
  const { width: WIDTH } = useWindowDimensions();
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
  const autocompleteHeight = useSharedValue(0);
  const isOnExplore = pathname.includes('explore');
  const autocompleteHeightValue = useMemo(() => {
    const titlesAutocompleteLength = titlesAutocomplete?.length || 0;
    const entireAutocompleteHeight =
      titlesAutocompleteLength * 23 +
      (titlesAutocompleteLength - 1) * 17 +
      8 +
      12;

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
      <StyledTouchableOpacity
        className="px-3 h-7 justify-center"
        onPress={async () => await searchItem(item)}
      >
        <Text>{item}</Text>
      </StyledTouchableOpacity>
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
      <View
        className="flex-row items-center justify-end gap-1 mr-3 pr-1 w-full"
        style={{ width: WIDTH - 68 }}
      >
        <View
          className={`flex-row items-center justify-end gap-1 ml-1 h-10 flex-1 ${isExploring ? 'border-b border-gray-500' : ''}`}
        >
          <TextInput
            ref={inputRef}
            className={`h-10 flex-1 color-white pl-1 font-urbanist-regular ${isExploring ? 'flex' : 'hidden'}`}
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
            className="absolute w-screen rounded-b-xl overflow-hidden top-safe-offset-12"
            style={autocompleteAnimatedStyles}
          >
            <BlurView
              className={Platform.select({
                ios: 'pb-3 pt-2 rounded-b-xl overflow-hidden top-2 bg-background/85',
                android:
                  'pb-3 pt-2 rounded-b-xl overflow-hidden top-2 bg-background/95',
              })}
              style={{ height: autocompleteHeightValue }}
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
