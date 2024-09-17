import { StyleSheet } from 'react-native';
import { colors } from '@/styles';
import { LoovieLogo } from '@/components/svgs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpRequest } from '@/requests';
import { SignUpParams, SignUpValues } from '@/types';
import { resetToRoute } from '@/utils';
import { SignUpForm } from '@/components/sign_up/SignUpForm/SignUpForm';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignUp() {
  const queryClient = useQueryClient();
  const { mutateAsync: signUp } = useMutation({
    mutationFn: (params: SignUpParams) => signUpRequest(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'me'],
      });
      resetToRoute('/(main)/home');
    },
  });

  const onSubmit = ({
    username,
    email,
    first_name,
    last_name,
    birth_date,
    password,
  }: SignUpValues) => {
    signUp({ username, email, first_name, last_name, birth_date, password });
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
