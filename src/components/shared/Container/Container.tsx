import { colors } from '@/styles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContainerProps } from './Container.types';

export function Container({ safeArea, children }: ContainerProps) {
  return (
    <SafeAreaView edges={safeArea ? ['top'] : []} style={styles.container}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
