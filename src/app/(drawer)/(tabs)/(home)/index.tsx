import { NewPostButton, SearchBar } from '@/components/home';
import { DrawerToggleButton } from '@/components/navigation';
import { Container, Text } from '@/components/shared';
import { useAuth } from '@/contexts';
import { useAppRouteOptions } from '@/hooks';
import React from 'react';

export default function Home() {
  const { user } = useAuth();
  useAppRouteOptions({
    headerLeft: () => <DrawerToggleButton />,
    headerRight: () => <SearchBar />,
  });

  return (
    <Container hasBottomTabs>
      <Text style={{ color: '#FFF' }}>home {user?.first_name}</Text>
      <NewPostButton />
    </Container>
  );
}
