import { defaultStackOptions } from '@/config';
import { Stack } from 'expo-router';
import React from 'react';

export default function RecommendationsLayout() {
  return <Stack screenOptions={defaultStackOptions} />;
}
