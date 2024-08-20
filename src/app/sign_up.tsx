import { Button, Input } from '@/components/shared';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/validators';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors } from '@/styles';
import { LoovieLogo } from '@/components/svgs';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpRequest } from '@/requests';
import { SignUpParams } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resetToRoute } from '@/utils';

export default function SignUp() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
    values: {
      username: 'drar',
      email: 'kauadrar@gmail.com',
      first_name: 'Kauã',
      last_name: 'Drar',
      password: 'password',
      confirmation_password: 'password',
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: signUp } = useMutation({
    mutationKey: ['login'],
    mutationFn: (params: SignUpParams) => signUpRequest(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'me'],
      });

      resetToRoute('/(main)/home');
    },
  });

  const onSubmit = async (params: typeof signUpSchema.__outputType) => {
    await signUp(params);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView style={styles.content}>
          <LoovieLogo />
          <View style={styles.formArea}>
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  preffix={
                    <FontAwesome6 name="user" size={20} color={colors.gray1} />
                  }
                  placeholder="Usuário"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
              name="username"
            />
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  preffix={
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={colors.gray1}
                    />
                  }
                  placeholder="E-mail"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  preffix={
                    <Ionicons name="text" size={20} color={colors.gray1} />
                  }
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
              name="first_name"
            />
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  preffix={
                    <Ionicons name="text" size={20} color={colors.gray1} />
                  }
                  placeholder="Sobrenome"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
              name="last_name"
            />
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  preffix={
                    <Feather name="lock" size={20} color={colors.gray1} />
                  }
                  placeholder="Senha"
                  value={value}
                  onChangeText={onChange}
                  type="password"
                  errorMessage={error?.message}
                />
              )}
              name="password"
            />
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  preffix={
                    <Feather name="lock" size={20} color={colors.gray1} />
                  }
                  placeholder="Confirmar senha"
                  value={value}
                  onChangeText={onChange}
                  type="password"
                  errorMessage={error?.message}
                />
              )}
              name="confirmation_password"
            />
          </View>
          <Button label="Cadastrar" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
    paddingHorizontal: 48,
    paddingVertical: 12,
  },
  formArea: {
    gap: 24,
  },
});
