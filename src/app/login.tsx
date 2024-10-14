import { Button, Input } from '@/components/shared';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validators';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '@/styles';
import { LoovieLogo } from '@/components/svgs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginRequest } from '@/requests';
import { LoginParams } from '@/types';
import { resetToRoute } from '@/utils';
import { Lock, Mail } from 'lucide-react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const passwordInputRef = useRef<TextInput>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: login } = useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginParams) => loginRequest(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'me'],
      });

      resetToRoute('/(drawer)/(tabs)/home');
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
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <LoovieLogo />
        <KeyboardAvoidingView style={styles.formArea} behavior="padding">
          <View style={styles.form}>
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  autoFocus
                  prefix={<Mail size={22} color={colors.gray1} />}
                  label="E-mail ou Usuário"
                  placeholder="E-mail ou Usuário"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
              )}
              name="email_or_username"
            />
            <Controller
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  ref={passwordInputRef}
                  prefix={<Lock size={20} color={colors.gray1} />}
                  label="Senha"
                  placeholder="Senha"
                  value={value}
                  onChangeText={onChange}
                  type="password"
                  errorMessage={error?.message}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
              name="password"
            />
          </View>
          <Button style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            Entrar
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    alignItems: 'center',
  },
  form: {
    width: '100%',
    gap: 6,
  },
  submitButton: {
    marginTop: 60,
  },
});
