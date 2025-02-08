import { BackButton } from '@/components/navigation';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback } from 'react';

export function useAppRouteOptions(options: DrawerNavigationOptions) {
  const rootNavigation = useNavigation('/(drawer)');

  const resetOptions = useCallback(() => {
    rootNavigation.setOptions({
      headerRight: () => null,
      headerLeft: () => <BackButton />,
    });
  }, [rootNavigation]);

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions(options);

      return () => {
        resetOptions();
      };
    }, [rootNavigation, options, resetOptions]),
  );
}
