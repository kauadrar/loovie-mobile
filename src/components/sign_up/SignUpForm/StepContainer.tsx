import { StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

export function StepContainer({ children }: PropsWithChildren) {
  const { width } = useWindowDimensions();

  return <View style={[styles.container, { width }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
  },
});
