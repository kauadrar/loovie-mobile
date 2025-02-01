import { BackButton, Button, Input } from '@/components/shared';
import { LoovieLogo } from '@/components/svgs';
import { loginRequest } from '@/requests';
import { colors } from '@/styles';
import { LoginParams } from '@/types';
import { resetToRoute } from '@/utils';
import { loginSchema } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Lock, Mail } from 'lucide-react-native';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
  const { top: topInset } = useSafeAreaInsets();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const passwordInputRef = useRef<TextInput>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: login } = useMutation({
    mutationKey: ['login'],
    mutationFn: (params: LoginParams) => loginRequest(params),
    onSuccess: async (data) => {
      queryClient.setQueryData(['users', 'me'], data);

      resetToRoute('/(drawer)/(tabs)');
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
        <BackButton style={[styles.backButton, { top: topInset }]} />
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
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
  },
});
