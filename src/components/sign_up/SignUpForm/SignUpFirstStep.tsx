import { Input } from '../../shared';
import { Controller } from 'react-hook-form';
import { colors } from '@/styles';
import { Mail, User } from 'lucide-react-native';
import { StepContainer } from './StepContainer';
import { signUpFirstStepSchema } from '@/validators';
import { SignUpFormStep } from './SignUpForm.types';
import { memo } from 'react';

export const SignUpFirstStep = memo(function SignUpFirstStep({
  control,
}: SignUpFormStep<typeof signUpFirstStepSchema.__outputType>) {
  return (
    <StepContainer>
      <Controller
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            prefix={<User size={22} color={colors.gray1} />}
            label="Usuário"
            placeholder="Usuário"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            prefix={<Mail size={22} color={colors.gray1} />}
            label="E-mail"
            placeholder="E-mail"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
        name="email"
      />
    </StepContainer>
  );
});
