import { colors } from '@/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, ReactNode, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { InputContainer } from './InputContainer';

export type InputProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: 'text' | 'password';
  errorMessage?: string;
  label?: string;
} & TextInputProps;

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    type = 'text',
    value,
    placeholder,
    label,
    errorMessage,
    prefix,
    suffix,
    ...props
  },
  ref,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordIcon = isPasswordVisible
    ? 'eye-off-outline'
    : 'eye-outline';
  const isInputPassword = type === 'password';

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((state) => !state);

  return (
    <InputContainer label={label} errorMessage={errorMessage} value={value}>
      <View className="w-full flex-row items-center rounded-2xl p-4 gap-2 bg-gray-900">
        {prefix && <View className="w-7">{prefix}</View>}
        <TextInput
          ref={ref}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={colors.gray1}
          className="color-white flex-1 text-base font-urbanist-regular align-middle leading-[16px]"
          value={value}
          {...props}
          secureTextEntry={isInputPassword && !isPasswordVisible}
        />
        {(isInputPassword || suffix) && (
          <View className="w-7">
            {isInputPassword ? (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <MaterialCommunityIcons
                  name={showPasswordIcon}
                  size={24}
                  color={colors.gray1}
                />
              </TouchableOpacity>
            ) : (
              suffix
            )}
          </View>
        )}
      </View>
    </InputContainer>
  );
});
