import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { Platform, Text } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

type ContainerProps = {
  safeArea?: boolean;
  title?: NativeStackNavigationOptions['title'];
  headerLeft?: NativeStackNavigationOptions['headerLeft'];
  headerRight?: NativeStackNavigationOptions['headerRight'];
  headerSearchBarOptions?: NativeStackNavigationOptions['headerSearchBarOptions'];
} & SafeAreaViewProps;

export function Container({
  safeArea,
  children,
  title,
  className,
  headerLeft,
  headerRight,
}: ContainerProps) {
  const rootNavigation =
    useNavigation<
      NavigationProp<object, never, string, never, NativeStackNavigationOptions>
    >();

  useFocusEffect(
    useCallback(() => {
      rootNavigation?.setOptions({
        headerLeft,
        headerRight,
        headerTitle: title
          ? Platform.select<NativeStackNavigationOptions['headerTitle']>({
              ios: title,
              android: () => (
                <Text className="text-white text-md pl-2">{title}</Text>
              ),
            })
          : '',
      });
    }, [rootNavigation, title, headerLeft, headerRight]),
  );

  return (
    <SafeAreaView
      edges={safeArea ? ['top'] : []}
      className={`flex-1 bg-background ${className}`}
    >
      {children}
    </SafeAreaView>
  );
}
