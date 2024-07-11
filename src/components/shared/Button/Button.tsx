import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./Button.styles";
import { Text } from "../Text/Text";
import { ButtonProps } from "./Button.types";

export function Button({ label, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.buttonText} weight="Medium">{label}</Text>
    </TouchableOpacity>
  )
}