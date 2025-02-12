import { unistyleIcon } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { withUnistyles } from 'react-native-unistyles';
import { InputContainer } from '../InputContainer/InputContainer';
import { styles } from './Input.styles';
import { InputProps } from './Input.types';

const UniMaterialCommunityIcons = unistyleIcon(MaterialCommunityIcons);
const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.gray1,
}));
const UniView = withUnistyles(View);

export const Input = withUnistyles(
  forwardRef<TextInput, InputProps>(function Input(
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
        <UniView style={styles.inputArea}>
          {prefix && <View style={styles.iconArea}>{prefix}</View>}
          <UniTextInput
            ref={ref}
            autoCapitalize="none"
            placeholder={placeholder}
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
                  <UniMaterialCommunityIcons
                    name={showPasswordIcon}
                    size={24}
                  />
                </TouchableOpacity>
              ) : (
                suffix
              )}
            </View>
          )}
        </UniView>
      </InputContainer>
    );
  }),
);
