import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { TextProps } from "./Text.types";
import { forwardRef } from "react";

export const Text = forwardRef<RNText, TextProps>(({ family = 'Urbanist', weight = 'Regular', style, children }, ref) => {
  const fontFamily = `${family}-${weight}`
  return (
    <RNText ref={ref} style={[{ fontFamily }, style]}>{children}</RNText>
  )
})