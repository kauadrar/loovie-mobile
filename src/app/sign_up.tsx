import { StyleSheet, View } from 'react-native';
import { colors } from '@/styles';
import { LoovieLogo } from '@/components/svgs';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { loginRequest } from '@/requests';
// import { LoginParams } from '@/types';
// import { resetToRoute } from '@/utils';
import { SignUpForm } from '@/components/sign_up/SignUpForm/SignUpForm';

export default function Login() {
  // const queryClient = useQueryClient();
  // const { mutateAsync: login } = useMutation({
  //   mutationKey: ['login'],
  //   mutationFn: (params: LoginParams) => loginRequest(params),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['users', 'me'],
  //     });

  //     resetToRoute('/(main)/home');
  //   },
  // });

  return (
    <View style={styles.container}>
      <LoovieLogo />
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
