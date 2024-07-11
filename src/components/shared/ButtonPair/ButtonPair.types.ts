import { StyleProp, ViewStyle } from "react-native"

export type ButtonPairProps = {
  style?: StyleProp<ViewStyle>
  leftLabel: string
  rightLabel: string
  leftOnPress?: () => void
  rightOnPress?: () => void
}