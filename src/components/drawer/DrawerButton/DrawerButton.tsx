import { Text } from '@/components/shared';
import { colors } from '@/styles';
import React, { forwardRef } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { DrawerButtonProps } from './DrawerButton.types';

export const DrawerButton = forwardRef<View, DrawerButtonProps>(
  function DrawerButton(
    { Icon, label, isFocused, color: customColor, ...props },
    ref,
  ) {
    const color = customColor || (isFocused ? colors.white : colors.gray1);

    return (
      <Pressable
        android_ripple={{
          color: `${colors.gray2}33`,
          radius: 30,
          borderless: true,
        }}
        ref={ref}
        {...props}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.button,
              { backgroundColor: isFocused ? colors.gray2 : colors.background },
              pressed && Platform.OS === 'ios' && { opacity: 0.5 },
            ]}
          >
            <Icon
              size={25}
              weight={isFocused ? 'fill' : 'regular'}
              color={color}
            />
            <Text
              style={{
                color: color,
              }}
              weight={isFocused ? 'SemiBold' : 'Regular'}
            >
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});
