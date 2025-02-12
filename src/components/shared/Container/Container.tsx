import { BackButton } from '@/components/navigation';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Container.styles';
import { ContainerProps } from './Container.types';

export function Container({
  safeArea,
  children,
  headerLeft,
  headerRight,
}: ContainerProps) {
  const rootNavigation = useNavigation('/(drawer)');

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        headerLeft: headerLeft || (() => <BackButton />),
        headerRight: headerRight || (() => null),
      });
    }, [rootNavigation]),
  );

  return (
    <SafeAreaView edges={safeArea ? ['top'] : []} style={styles.container}>
      {children}
    </SafeAreaView>
  );
}
