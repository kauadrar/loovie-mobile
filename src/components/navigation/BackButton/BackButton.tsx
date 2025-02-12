import { unistyleIcon } from '@/utils';
import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { UnistylesRuntime, withUnistyles } from 'react-native-unistyles';
import { styles } from './BackButton.styles';

const UniArrowLeft = unistyleIcon(ArrowLeft);

export const BackButton = withUnistyles(function BackButton({
  style,
  onPress,
}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={() =>
        UnistylesRuntime.setTheme(
          UnistylesRuntime.themeName === 'light' ? 'dark' : 'light',
        )
      }
      style={[styles.button, style]}
    >
      <UniArrowLeft size={24} />
    </TouchableOpacity>
  );
});
