import { LoovieLogo } from '@/components/icons';
import { BackButton } from '@/components/navigation';
import { Button, Input } from '@/components/shared';
import { loginRequest } from '@/requests';
import { colors } from '@/styles';
import { LoginParams } from '@/types';
import { resetToRoute } from '@/utils';
import { loginSchema } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Lock, Mail } from 'lucide-react-native';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function Login() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const passwordInputRef = useRef<TextInput>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: login } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (params: LoginParams) => await loginRequest(params),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], data);

      resetToRoute('/');
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        showMessage({
          message: error.response.data.error,
          type: 'danger',
          backgroundColor: colors.danger,
        });
      }
    },
  });

  const onSubmit = async (params: typeof loginSchema.__outputType) => {
    await login(params);
  };

  return (
    <ScrollView
      contentContainerClassName="grow w-full"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 w-full bg-background justify-center items-center px-4 gap-20">
        <BackButton className="self-start absolute top-0 mt-safe pl-4" />
        <LoovieLogo />
        <KeyboardAvoidingView
          className="w-full items-center"
          behavior="padding"
        >
          <View className="w-full gap-2">
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
              name="login"
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
          <Button className="mt-14" onPress={handleSubmit(onSubmit)}>
            Entrar
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}
