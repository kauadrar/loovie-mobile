import { colors } from '@/styles';
import { signUpFirstStepSchema } from '@/validators';
import { Mail, User } from 'lucide-react-native';
import { memo } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../../shared';
import { SignUpFormStep } from './SignUpForm.types';
import { StepContainer } from './StepContainer';

export const SignUpFirstStep = memo(function SignUpFirstStep({
  form,
  handleSubmit,
}: SignUpFormStep<typeof signUpFirstStepSchema.__outputType>) {
  return (
    <StepContainer>
      <Controller
        control={form.control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            autoFocus
            prefix={<User size={22} color={colors.gray1} />}
            label="Usuário"
            placeholder="Usuário"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('email')}
          />
        )}
        name="username"
      />
      <Controller
        control={form.control}
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            ref={ref}
            prefix={<Mail size={22} color={colors.gray1} />}
            label="E-mail"
            placeholder="E-mail"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            keyboardType="email-address"
          />
        )}
        name="email"
      />
    </StepContainer>
  );
});
