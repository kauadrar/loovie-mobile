import { View } from "react-native";
import { styles } from "./ButtonPair.styles";
import { PropsWithChildren } from "react";
import { Button } from "../Button/Button";
import { ButtonPairProps } from "./ButtonPair.types";

export function ButtonPair({ style, leftLabel, rightLabel, leftOnPress, rightOnPress }: ButtonPairProps) {
  return (
    <View style={[styles.buttonPair, style]}>
      <Button style={styles.button} label={leftLabel} onPress={leftOnPress} />
      <Button style={styles.button} label={rightLabel} onPress={rightOnPress} />
    </View>
  )
}