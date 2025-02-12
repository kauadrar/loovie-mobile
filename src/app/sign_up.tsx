import { SignUpForm } from '@/components/sign_up/SignUpForm/SignUpForm';
import { LoovieLogo } from '@/components/svgs';
import { signUpRequest } from '@/requests';
import { SignUpParams, SignUpValues } from '@/types';
import { resetToRoute } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

export default function SignUp() {
  const queryClient = useQueryClient();
  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => await signUpRequest(params),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], data);

      resetToRoute('/');
    },
  });

  const onSubmit = ({
    username,
    email,
    firstName,
    lastName,
    birthday,
    password,
  }: SignUpValues) => {
    signUp({
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      birthday,
      password,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <LoovieLogo />
      <SignUpForm onSubmit={onSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
}));
