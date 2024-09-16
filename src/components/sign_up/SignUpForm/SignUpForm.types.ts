import {
  signUpFirstStepSchema,
  signUpSecondStepSchema,
  signUpThirdStepSchema,
} from '@/validators';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';

export type SignUpFormStep<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
};

export type SignUpFormFirstStep = UseFormReturn<
  typeof signUpFirstStepSchema.__outputType
>;

export type SignUpFormSecondStep = UseFormReturn<
  typeof signUpSecondStepSchema.__outputType
>;

export type SignUpFormThirdStep = UseFormReturn<
  typeof signUpThirdStepSchema.__outputType
>;
