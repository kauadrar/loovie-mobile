import { Button, Input } from '@/components/shared';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validators';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors } from '@/styles';
import { LoovieLogo } from '@/components/svgs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginRequest } from '@/requests';
import { LoginParams } from '@/types';
import { resetToRoute } from '@/utils';
import { Lock, Mail } from 'lucide-react-native';

export default function Login() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const queryClient = useQueryClient();
  const { mutateAsync: login } = useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginParams) => loginRequest(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'me'],
      });

      resetToRoute('/(main)/home');
    },
  });

  const onSubmit = async ({
    email_or_username,
    password,
  }: typeof loginSchema.__outputType) => {
    const params = {
      password,
    } as LoginParams;

    if (email_or_username.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      params.email = email_or_username;
    } else {
      params.username = email_or_username;
    }

    await login(params);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.content}>
        <LoovieLogo />
        <View style={styles.formArea}>
          <Controller
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                prefix={<Mail size={22} color={colors.gray1} />}
                placeholder="E-mail ou Usuário"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
            name="email_or_username"
          />
          <Controller
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                prefix={<Lock size={20} color={colors.gray1} />}
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
                type="password"
                errorMessage={error?.message}
              />
            )}
            name="password"
          />
        </View>
        <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 60,
  },
  formArea: {
    width: '100%',
    gap: 10,
  },
});
