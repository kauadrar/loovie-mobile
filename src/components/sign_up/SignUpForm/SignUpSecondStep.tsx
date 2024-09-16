import React, { memo } from 'react';
import { Input, Pair } from '../../shared';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles';
import { DateInput } from '../../shared/DateInput/DateInput';
import { Calendar } from 'lucide-react-native';
import { StepContainer } from './StepContainer';
import { signUpSecondStepSchema } from '@/validators';
import { SignUpFormStep } from './SignUpForm.types';

export const SignUpSecondStep = memo(function SignUpSecondStep({
  control,
}: SignUpFormStep<typeof signUpSecondStepSchema.__outputType>) {
  return (
    <StepContainer>
      <Pair>
        <Controller
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              prefix={<Ionicons name="text" size={20} color={colors.gray1} />}
              label="Nome"
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
            />
          )}
          name="first_name"
        />
        <Controller
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              prefix={<Ionicons name="text" size={20} color={colors.gray1} />}
              label="Sobrenome"
              placeholder="Sobrenome"
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
            />
          )}
          name="last_name"
        />
      </Pair>
      <Controller
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DateInput
            prefix={<Calendar size={22} color={colors.gray1} />}
            label="Data de nascimento"
            placeholder="DD/MM/AAAA"
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
          />
        )}
        name="birth_date"
      />
    </StepContainer>
  );
});
