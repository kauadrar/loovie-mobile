import { StyleSheet, View } from 'react-native';
import { colors } from '@/styles';
import { Pair, Text } from '@/components/shared';
import { LoovieLogo } from '@/components/svgs';

export default function Lobby() {
  return (
    <View style={styles.container}>
      <LoovieLogo />
      <Text style={styles.title}>Seja bem vindo(a) ao Loovie</Text>
      <Pair>
        <Pair.Button label="Entrar" href="/login" />
        <Pair.Button label="Cadastrar" href="/sign_up" />
      </Pair>
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
    textAlign: 'center',
  },
});
