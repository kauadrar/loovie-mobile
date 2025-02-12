import { colors } from '@/styles';
import { unistyleIcon } from '@/utils';
import { signUpFirstStepSchema } from '@/validators';
import { debounce } from 'lodash';
import { CheckCircle, Mail, User, XCircle } from 'lucide-react-native';
import { memo, useCallback } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { withUnistyles } from 'react-native-unistyles';
import { Input } from '../../shared';
import { SignUpFormStep } from './SignUpForm.types';
import { StepContainer } from './StepContainer';

const UniCheckCircle = withUnistyles(CheckCircle, (theme) => ({
  color: theme.colors.success,
}));
const UniActivityIndicator = withUnistyles(ActivityIndicator, (theme) => ({
  color: theme.colors.gray1,
}));
const UniUser = unistyleIcon(User);
const UniMail = unistyleIcon(Mail);

export const SignUpFirstStep = memo(function SignUpFirstStep({
  form,
  handleSubmit,
}: SignUpFormStep<typeof signUpFirstStepSchema.__outputType>) {
  const isSubmitting = form.formState.isSubmitting;

  const getSuffix = useCallback(
    (value: string, isValidating: boolean, error?: FieldError) => {
      if (isValidating && !isSubmitting) {
        return <UniActivityIndicator size="small" />;
      }

      if (value && !error) {
        return <UniCheckCircle size={22} />;
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
            prefix={<UniUser size={22} />}
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
            prefix={<UniMail size={22} />}
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
