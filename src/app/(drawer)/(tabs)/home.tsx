import { Container, Text } from '@/components/shared';
import { useAuth } from '@/contexts';
import React from 'react';

export default function Home() {
  const { user } = useAuth();

  return (
    <Container>
      <Text style={{ color: '#FFF' }}>home {user?.firstName}</Text>
    </Container>
  );
}
