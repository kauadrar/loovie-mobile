import { colors } from '@/styles';
import { forwardRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TabButtonProps } from './TabButton.types';

export const TabButton = forwardRef<View, TabButtonProps>(function TabButton(
  { Icon, isFocused, ...props },
  ref,
) {
  return (
    <Pressable
      android_ripple={{
        color: `${colors.gray2}33`,
        radius: 30,
        borderless: true,
      }}
      ref={ref}
      {...props}
      style={styles.button}
    >
      {({ pressed }) => (
        <Icon
          size={25}
          weight={isFocused || pressed ? 'fill' : 'regular'}
          color={isFocused || pressed ? colors.primary : colors.gray1}
        />
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
});
