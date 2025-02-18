import { colors } from '@/styles';
import { SignUpFormStep } from '@/types';
import { signUpFirstStepSchema } from '@/validators';
import { debounce } from 'lodash';
import { CheckCircle, Mail, User, XCircle } from 'lucide-react-native';
import { memo, useCallback } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { Input } from '../shared';
import { StepContainer } from './StepContainer';

export const SignUpFirstStep = memo(function SignUpFirstStep({
  form,
  handleSubmit,
}: SignUpFormStep<typeof signUpFirstStepSchema.__outputType>) {
  const isSubmitting = form.formState.isSubmitting;

  const getSuffix = useCallback(
    (value: string, isValidating: boolean, error?: FieldError) => {
      if (isValidating && !isSubmitting) {
        return <ActivityIndicator size="small" color={colors.gray1} />;
      }

      if (value && !error) {
        return <CheckCircle size={22} color="#00FF00" />;
      }

      if (!value || error?.type !== 'uniqueness') return null;

      return <XCircle size={22} color={colors.primary} />;
    },
    [isSubmitting],
  );

  return (
    <StepContainer>
      <Controller
        control={form.control}
        render={({
          field: { value, onChange },
          fieldState: { error, isValidating },
        }) => (
          <Input
            autoFocus
            prefix={<User size={22} color={colors.gray1} />}
            suffix={getSuffix(value, isValidating, error)}
            label="Usuário"
            placeholder="Usuário"
            onChangeText={debounce(onChange, 500)}
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
          fieldState: { error, isValidating },
        }) => (
          <Input
            ref={ref}
            prefix={<Mail size={22} color={colors.gray1} />}
            suffix={getSuffix(value, isValidating, error)}
            label="E-mail"
            placeholder="E-mail"
            onChangeText={debounce(onChange, 500)}
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
