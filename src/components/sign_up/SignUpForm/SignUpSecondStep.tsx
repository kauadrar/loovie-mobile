import { colors } from '@/styles';
import { signUpSecondStepSchema } from '@/validators';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'lucide-react-native';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { Input, Pair } from '../../shared';
import { DateInput } from '../../shared/DateInput/DateInput';
import { SignUpFormStep } from './SignUpForm.types';
import { StepContainer } from './StepContainer';

export const SignUpSecondStep = memo(function SignUpSecondStep({
  form,
  handleSubmit,
}: SignUpFormStep<typeof signUpSecondStepSchema.__outputType>) {
  return (
    <StepContainer>
      <Pair>
        <Controller
          control={form.control}
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => (
            <Input
              ref={ref}
              prefix={<Ionicons name="text" size={20} color={colors.gray1} />}
              label="Nome"
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
              returnKeyType="next"
              onSubmitEditing={() => form.setFocus('lastName')}
            />
          )}
          name="firstName"
        />
        <Controller
          control={form.control}
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => (
            <Input
              ref={ref}
              prefix={<Ionicons name="text" size={20} color={colors.gray1} />}
              label="Sobrenome"
              placeholder="Sobrenome"
              value={value}
              onChangeText={onChange}
              errorMessage={error?.message}
              returnKeyType="next"
              onSubmitEditing={() => form.setFocus('birthday')}
            />
          )}
          name="lastName"
        />
      </Pair>
      <Controller
        control={form.control}
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <DateInput
            ref={ref}
            prefix={<Calendar size={22} color={colors.gray1} />}
            label="Data de nascimento"
            placeholder="DD/MM/AAAA"
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
          />
        )}
        name="birthday"
      />
    </StepContainer>
  );
});
