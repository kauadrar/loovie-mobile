import { View } from "react-native";
import { styles } from "./Pair.styles";
import React, { Children, PropsWithChildren } from "react";
import { Button } from "../Button/Button";
import { PairComponent } from "./Pair.types";
import { ButtonProps } from "../Button/Button.types";

function PairButton(props: ButtonProps) {
  return (
    <View style={styles.button}>
      <Button {...props} />
    </View>
  )
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
  )
}

Pair.Button = PairButton;
