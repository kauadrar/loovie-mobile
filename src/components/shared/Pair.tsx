import React, { Children, FunctionComponent, PropsWithChildren } from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { InputProps } from './Input';

export type PairComponent = FunctionComponent<PairProps> & {
  Input: FunctionComponent<InputProps>;
  Button: FunctionComponent<TouchableOpacityProps>;
};

export type PairProps = {
  className?: string;
  children: React.ReactNode;
};

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
