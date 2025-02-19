import { colors } from '@/styles';
import { forwardRef, ReactNode } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { InputContainer } from './InputContainer';

export type TextAreaProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  errorMessage?: string;
  label?: string;
} & TextInputProps;

export const TextArea = forwardRef<TextInput, TextAreaProps>(function Input(
  { value, placeholder, label, errorMessage, prefix, suffix, ...props },
  ref,
) {
  return (
    <InputContainer label={label} errorMessage={errorMessage} value={value}>
      <View className="w-full h-28 flex-row rounded-2xl border border-gray-800 p-4 gap-2 bg-background">
        {prefix && <View className="w-6">{prefix}</View>}
        <TextInput
          ref={ref}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={colors.gray1}
          className="color-white flex-1 text-base font-urbanist-regular align-middle leading-[16px] h-full"
          value={value}
          {...props}
          multiline
        />
        {suffix && <View className="w-6">{suffix}</View>}
      </View>
    </InputContainer>
  );
});
