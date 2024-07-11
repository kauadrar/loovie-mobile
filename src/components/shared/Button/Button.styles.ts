import { colors } from "@/src/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.gray1,
    padding: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.gray1,
    fontSize: 16
  }
})