import { BackButton } from '@/components/navigation';
import { HeaderOptions } from '@react-navigation/elements';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

type ContainerProps = {
  safeArea?: boolean;
  headerLeft?: HeaderOptions['headerLeft'];
  headerRight?: HeaderOptions['headerRight'];
} & SafeAreaViewProps;

export function Container({
  safeArea,
  children,
  headerLeft,
  headerRight,
  className,
}: ContainerProps) {
  const rootNavigation =
    useNavigation<NavigationProp<object, never, '/(drawer)'>>().getParent(
      '/(drawer)',
    );

  useFocusEffect(
    useCallback(() => {
      rootNavigation?.setOptions({
        headerLeft: headerLeft || (() => <BackButton />),
        headerRight: headerRight || (() => null),
      });
    }, [rootNavigation, headerLeft, headerRight]),
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
