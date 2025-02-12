import { colors } from '@/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { InputContainer } from '../InputContainer/InputContainer';
import { InputProps } from './Input.types';

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
      <View className="w-full flex-row items-center rounded-2xl border border-gray-800 p-4 gap-2 bg-background">
        {prefix && <View className="w-6">{prefix}</View>}
        <TextInput
          ref={ref}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={colors.gray1}
          className="color-white flex-1 text-base font-urbanist-regular align-middle leading-[16px]"
          value={value}
          {...props}
          multiline={type === 'area'}
          secureTextEntry={isInputPassword && !isPasswordVisible}
        />
        {(isInputPassword || suffix) && (
          <View className="w-6">
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
