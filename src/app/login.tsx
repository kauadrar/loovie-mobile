import { BackButton } from '@/components/navigation';
import { Button, Input } from '@/components/shared';
import { LoovieLogo } from '@/components/svgs';
import { loginRequest } from '@/requests';
import { colors } from '@/styles';
import { LoginParams } from '@/types';
import { resetToRoute, unistyleIcon } from '@/utils';
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
import { StyleSheet } from 'react-native-unistyles';

const UniMail = unistyleIcon(Mail);
const UniLock = unistyleIcon(Lock);

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
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <BackButton style={styles.backButton} />
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
                  prefix={<UniMail size={20} />}
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
                  prefix={<UniLock size={20} />}
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
          <Button
            style={{
              marginTop: 60,
            }}
            onPress={handleSubmit(onSubmit)}
          >
            Entrar
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flexGrow: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: rt.insets.top,
  },
}));
