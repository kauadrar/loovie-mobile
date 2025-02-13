import React, { Children, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { PairProps } from './Pair.types';

function Item({ children }: PropsWithChildren) {
  return <View className="w-auto flex-1">{children}</View>;
}

export function Pair({ className, children }: PairProps) {
  return (
    <View
      className={`w-full gap-2 flex-row justify-center items-start ${className}`}
    >
      {Children.map(children, (child) => {
        return <Item>{child}</Item>;
      })}
    </View>
  );
}
