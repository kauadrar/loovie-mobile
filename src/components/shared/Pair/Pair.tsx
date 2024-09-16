import React, { Children, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './Pair.styles';
import { PairProps } from './Pair.types';

function Item({ children }: PropsWithChildren) {
  return <View style={styles.item}>{children}</View>;
}

export function Pair({ style, children }: PairProps) {
  return (
    <View style={[styles.pair, style]}>
      {Children.map(children, (child) => {
        return <Item>{child}</Item>;
      })}
    </View>
  );
}
