import { colors } from '@/styles';
import { router } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './BackButton.styles';

export function BackButton({ style, onPress }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={onPress || router.back}
      style={[styles.button, style]}
    >
      <ArrowLeft size={24} color={colors.gray1} />
    </TouchableOpacity>
  );
}
