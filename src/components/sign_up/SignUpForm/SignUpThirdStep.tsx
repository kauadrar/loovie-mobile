import { Input } from '../../shared';
import { Controller } from 'react-hook-form';
import { colors } from '@/styles';
import { Lock, LockOpen } from 'lucide-react-native';
import { StepContainer } from './StepContainer';
import { signUpThirdStepSchema } from '@/validators';
import { SignUpFormStep } from './SignUpForm.types';
import { memo } from 'react';

export const SignUpThirdStep = memo(function SignUpThirdStep({
  form,
  handleSubmit,
}: SignUpFormStep<typeof signUpThirdStepSchema.__outputType>) {
  return (
    <StepContainer>
      <Controller
        control={form.control}
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            ref={ref}
            prefix={<LockOpen size={20} color={colors.gray1} />}
            label="Senha"
            placeholder="Senha"
            value={value}
            onChangeText={onChange}
            type="password"
            errorMessage={error?.message}
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('confirmation_password')}
          />
        )}
        name="password"
      />
      <Controller
        control={form.control}
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            ref={ref}
            prefix={<Lock size={20} color={colors.gray1} />}
            label="Confirmar senha"
            placeholder="Confirmar senha"
            value={value}
            onChangeText={onChange}
            type="password"
            errorMessage={error?.message}
            onSubmitEditing={handleSubmit}
          />
        )}
        name="confirmation_password"
      />
    </StepContainer>
  );
});
