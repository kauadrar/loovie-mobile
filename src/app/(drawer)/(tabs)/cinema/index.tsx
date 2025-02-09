import { DrawerToggleButton } from '@/components/navigation';
import { Container, Text } from '@/components/shared';
import React from 'react';

export default function Cinema() {
  return (
    <Container headerLeft={() => <DrawerToggleButton />}>
      <Text>Cinema</Text>
    </Container>
  );
}
