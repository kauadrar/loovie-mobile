import { DrawerToggleButton } from '@/components/navigation';
import { Container, Text } from '@/components/shared';
import React from 'react';

export default function Notifications() {
  return (
    <Container headerLeft={() => <DrawerToggleButton />} title="Notifications">
      <Text>Notifications</Text>
    </Container>
  );
}
