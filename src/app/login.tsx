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
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/requests';
import { LoginParams } from '@/types';

export default function Login() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { mutateAsync: login } = useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginParams) => loginRequest(params),
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
                preffix={
                  <FontAwesome6 name="user" size={20} color={colors.gray1} />
                }
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
                preffix={<Feather name="lock" size={20} color={colors.gray1} />}
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
        <Button label="Entrar" onPress={handleSubmit(onSubmit)} />
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
    paddingHorizontal: 48,
    gap: 60,
  },
  formArea: {
    gap: 24,
  },
});
