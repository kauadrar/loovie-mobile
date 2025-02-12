import { Pair, Text } from '@/components/shared';
import { LinkButton } from '@/components/shared/LinkButton/LinkButton';
import { LoovieLogo } from '@/components/svgs';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    gap: 48,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
}));
