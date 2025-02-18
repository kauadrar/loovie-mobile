import { colors } from '@/styles';
import { router } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function BackButton({ className, onPress }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={onPress || router.back}
      className={`p-2 ${className}`}
    >
      <ArrowLeft size={24} color={colors.gray1} />
    </TouchableOpacity>
  );
}
