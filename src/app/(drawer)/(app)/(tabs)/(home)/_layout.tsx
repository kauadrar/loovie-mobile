import { defaultStackOptions } from '@/config';
import { colors } from '@/styles';
import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return (
    <Stack screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="index"
        options={{
          headerSearchBarOptions: {
            textColor: 'white',
            placeholder: 'Search',
            placement: 'stacked',
            headerIconColor: colors.gray1,
            hintTextColor: colors.gray1,
            shouldShowHintSearchIcon: false,
          },
        }}
      />
      <Stack.Screen name="explore" />
    </Stack>
  );
}
