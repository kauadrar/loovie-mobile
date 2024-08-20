import { useAuth } from '@/contexts';
import React from 'react';
import { Text, View } from 'react-native';

export default function Home() {
  const { user } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <Text>home {user?.first_name}</Text>
    </View>
  );
}
