import { BackButton } from '@/components/navigation';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContainerProps } from './Container.types';

export function Container({
  safeArea,
  children,
  headerLeft,
  headerRight,
  className,
}: ContainerProps) {
  const rootNavigation = useNavigation('/(drawer)');

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
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
