import { StyleSheet, View } from 'react-native';
import { Pair, Text } from '@/components/shared';
import { LoovieLogo } from '@/components/svgs';
import { LinkButton } from '@/components/shared/LinkButton/LinkButton';
import { colors } from '@/styles';

export default function Lobby() {
  return (
    <View style={styles.container}>
      <LoovieLogo />
      <Text style={styles.title}>Seja bem vindo(a) ao Loovie</Text>
      <Pair>
        <LinkButton href="/login">Entrar</LinkButton>
        <LinkButton href="/sign_up">Cadastrar</LinkButton>
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
