import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./Button.styles";
import { Text } from "../Text/Text";
import { ButtonProps } from "./Button.types";
import { Link } from "expo-router";

export function Button({ label, style, href = '', ...props }: ButtonProps) {
  const ButtonContainer = href ? Link : View;
  return (
    <ButtonContainer href={href} asChild style={styles.buttonArea}>
      <TouchableOpacity style={[styles.button, style]} {...props}>
        <Text style={styles.buttonText} weight="Medium">{label}</Text>
      </TouchableOpacity>
    </ButtonContainer>
  )
}