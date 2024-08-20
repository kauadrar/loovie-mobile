import { router } from 'expo-router';

export function resetToRoute(route: string) {
  router.dismissAll();
  router.replace(route);
}
