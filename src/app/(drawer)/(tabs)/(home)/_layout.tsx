import { Slot } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return <Slot />;
}
