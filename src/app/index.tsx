import { StyleSheet, View } from "react-native";
import { colors } from "../styles";
import { ButtonPair, Text } from "../components/shared";
import { LoovieLogo } from "../components/svgs";

export default function Lobby() {
  return (
    <View style={styles.container}>
      <LoovieLogo />
      <Text style={styles.title}>Seja bem vindo(a) ao Loovie</Text>
      <ButtonPair leftLabel="Cadastrar" rightLabel="Entrar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    gap: 48,
  },
  title: {
    color: colors.white,
    fontSize: 24,
  }
})