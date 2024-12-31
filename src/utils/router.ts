import { Href, router } from 'expo-router';

export function resetToRoute(route: Href) {
  router.dismissAll();
  router.replace(route);
}
