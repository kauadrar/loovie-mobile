import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

export function StepContainer({ children }: PropsWithChildren) {
  return <View className="justify-center gap-1 px-4 w-screen">{children}</View>;
}
