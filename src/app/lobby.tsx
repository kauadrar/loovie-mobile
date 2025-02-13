import { Pair, Text } from '@/components/shared';
import { LinkButton } from '@/components/shared/LinkButton/LinkButton';
import { LoovieLogo } from '@/components/svgs';
import { View } from 'react-native';

export default function Lobby() {
  return (
    <View className="flex-1 bg-background justify-center items-center px-12 gap-12">
      <LoovieLogo />
      <Text className="text-2xl text-center">Seja bem vindo(a) ao Loovie</Text>
      <Pair>
        <LinkButton href="/login">Entrar</LinkButton>
        <LinkButton href="/sign_up">Cadastrar</LinkButton>
      </Pair>
    </View>
  );
}
