import { SignUpValues } from '@/types';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type SignUpFormProps = {
  onSubmit: (values: SignUpValues) => void;
};

export type SignUpFormStep<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  handleSubmit: () => void;
};
