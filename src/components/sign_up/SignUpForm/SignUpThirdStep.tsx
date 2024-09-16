import { Input } from '../../shared';
import { Controller } from 'react-hook-form';
import { colors } from '@/styles';
import { Lock, LockOpen } from 'lucide-react-native';
import { StepContainer } from './StepContainer';
import { signUpThirdStepSchema } from '@/validators';
import { SignUpFormStep } from './SignUpForm.types';
import { memo } from 'react';

export const SignUpThirdStep = memo(function SignUpThirdStep({
  control,
}: SignUpFormStep<typeof signUpThirdStepSchema.__outputType>) {
  return (
    <StepContainer>
      <Controller
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            prefix={<LockOpen size={20} color={colors.gray1} />}
            label="Senha"
            placeholder="Senha"
            value={value}
            onChangeText={onChange}
            type="password"
            errorMessage={error?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            prefix={<Lock size={20} color={colors.gray1} />}
            label="Confirmar senha"
            placeholder="Confirmar senha"
            value={value}
            onChangeText={onChange}
            type="password"
            errorMessage={error?.message}
          />
        )}
        name="confirmation_password"
      />
    </StepContainer>
  );
});
