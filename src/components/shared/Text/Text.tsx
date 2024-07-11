import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { TextProps } from "./Text.types";

export function Text({ family = 'Urbanist', weight = 'Regular', style, children }: TextProps) {
  const fontFamily = `${family}-${weight}`
  return (
    <RNText style={[{ fontFamily }, style]}>{children}</RNText>
  )
}