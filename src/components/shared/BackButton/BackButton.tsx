import { colors } from '@/styles';
import { router } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './BackButton.styles';

export function BackButton({
  style,
  onPress,
  ...props
}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={onPress || router.back}
      {...props}
    >
      <ArrowLeft color={colors.gray1} size={26} />
    </TouchableOpacity>
  );
}
