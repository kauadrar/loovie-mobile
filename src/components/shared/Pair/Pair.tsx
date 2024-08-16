import React, { Children } from 'react';
import { View } from 'react-native';
import { Button } from '../Button/Button';
import { ButtonProps } from '../Button/Button.types';
import { styles } from './Pair.styles';
import { PairComponent } from './Pair.types';

function PairButton(props: ButtonProps) {
  return (
    <View style={styles.button}>
      <Button {...props} />
    </View>
  );
}

export const Pair: PairComponent = ({ style, children }) => {
  const childrenArray = Children.toArray(children);
  const firstChild = childrenArray[0];
  const secondChild = childrenArray[1];
  return (
    <View style={[styles.pair, style]}>
      {firstChild}
      {secondChild}
    </View>
  );
};

Pair.Button = PairButton;
