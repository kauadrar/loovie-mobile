import { colors } from '@/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './Input.styles';
import { InputProps } from './Input.types';
import { InputContainer } from '../InputContainer/InputContainer';

export function Input({
  type = 'text',
  value,
  placeholder,
  label,
  errorMessage,
  prefix,
  suffix,
  ...props
}: InputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordIcon = isPasswordVisible
    ? 'eye-off-outline'
    : 'eye-outline';
  const isInputPassword = type === 'password';

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((state) => !state);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <InputContainer label={label} errorMessage={errorMessage} value={value}>
      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={styles.inputArea}>
          {prefix && <View style={styles.iconArea}>{prefix}</View>}
          <TextInput
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor={colors.gray1}
            style={styles.input}
            value={value}
            {...props}
            multiline={type === 'area'}
            secureTextEntry={isInputPassword && !isPasswordVisible}
          />
          {(isInputPassword || suffix) && (
            <View style={styles.iconArea}>
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
      </TouchableWithoutFeedback>
    </InputContainer>
  );
}
