import { NewPostButton } from '@/components/home';
import { DrawerToggleButton } from '@/components/navigation';
import { Container, Text } from '@/components/shared';
import { useAuth } from '@/contexts';
import React from 'react';

export default function Home() {
  const { user } = useAuth();

  return (
    <Container title="Home" headerLeft={() => <DrawerToggleButton />}>
      <Text>home {user?.first_name}</Text>
      <NewPostButton />
    </Container>
  );
}
