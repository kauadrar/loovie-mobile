import { defaultStackOptions } from '@/config';
import { Stack } from 'expo-router';
import React from 'react';

export default function NotificationsLayout() {
  return <Stack screenOptions={defaultStackOptions} />;
}
