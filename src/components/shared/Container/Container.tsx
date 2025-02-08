import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ContainerProps } from './Container.types';

export function Container({
  safeArea,
  children,
  hasBottomTabs,
  hasHeader = true,
}: ContainerProps) {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();

  return (
    <SafeAreaView
      edges={safeArea ? ['top'] : []}
      style={[
        styles.container,
        hasBottomTabs && { paddingBottom: bottomInset + 70 },
        hasHeader && {
          paddingTop: topInset + 50,
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
