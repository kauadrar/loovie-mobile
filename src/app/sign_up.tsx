import { LoovieLogo } from '@/components/icons';
import { SignUpForm } from '@/components/sign_up/SignUpForm';
import { signUpRequest } from '@/requests';
import { SignUpParams, SignUpValues } from '@/types';
import { resetToRoute } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';

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
      contentContainerClassName="grow w-full bg-background justify-center items-center"
      keyboardShouldPersistTaps="handled"
    >
      <LoovieLogo />
      <SignUpForm onSubmit={onSubmit} />
    </ScrollView>
  );
}
