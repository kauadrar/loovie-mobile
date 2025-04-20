import { DrawerToggleButton } from '@/components/navigation';
import { Container, Text } from '@/components/shared';
import React from 'react';

export default function MyProfile() {
  return (
    <Container headerLeft={() => <DrawerToggleButton />} title="Profile">
      <Text>MyProfile</Text>
    </Container>
  );
}
