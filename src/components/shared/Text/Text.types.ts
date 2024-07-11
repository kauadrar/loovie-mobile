import { TextProps as RNTextProps } from "react-native";
import { FontFamily, FontWeight } from "@/src/types"

export type TextProps = {
  family?: FontFamily
  weight?: FontWeight
} & RNTextProps