import { SignUpForm } from '@/components/sign_up/SignUpForm/SignUpForm';
import { LoovieLogo } from '@/components/svgs';
import { signUpRequest } from '@/requests';
import { colors } from '@/styles';
import { SignUpParams, SignUpValues } from '@/types';
import { resetToRoute } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignUp() {
  const queryClient = useQueryClient();
  const { mutateAsync: signUp } = useMutation({
    mutationFn: (params: SignUpParams) => signUpRequest(params),
    onSuccess: async (data) => {
      queryClient.setQueryData(['users', 'me'], data);
      resetToRoute('/(drawer)/(tabs)');
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
});
