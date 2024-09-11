import { colors } from '@/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../Text/Text';
import { styles } from './Input.styles';
import { InputProps } from './Input.types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function Input({
  type = 'text',
  value,
  placeholder,
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
  const placeholderOpacity = useSharedValue(1);
  const errorMessageOpacity = useSharedValue(0);
  const AnimatedText = Animated.createAnimatedComponent(Text);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const placeholderAnimatedStyles = useAnimatedStyle(() => {
    const top = interpolate(placeholderOpacity.value, [0, 1], [42, 22]);
    return {
      top,
      opacity: placeholderOpacity.value,
    };
  }, []);

  const labelAnimatedStyles = useAnimatedStyle(() => {
    const height = interpolate(placeholderOpacity.value, [0, 1], [20, 0]);

    return {
      height,
      opacity: interpolate(placeholderOpacity.value, [0, 1], [1, 0]),
    };
  }, []);

  const errorMessageStyles = useAnimatedStyle(() => {
    const height = interpolate(errorMessageOpacity.value, [0, 1], [0, 16]);

    return {
      height,
      opacity: errorMessageOpacity.value,
    };
  }, []);

  useEffect(() => {
    if (value) {
      placeholderOpacity.value = withTiming(0, { duration: 200 });
    } else {
      placeholderOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [value]);

  useEffect(() => {
    if (errorMessage) {
      errorMessageOpacity.value = withTiming(1, { duration: 200 });
    } else {
      errorMessageOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [errorMessage]);

  return (
    <Animated.View style={styles.inputContainer}>
      <AnimatedText style={[styles.label, labelAnimatedStyles]}>
        {placeholder}
      </AnimatedText>
      <Animated.View
        style={[styles.placeholderArea, placeholderAnimatedStyles]}
      >
        <Text style={styles.placeholder} onPress={focusInput}>
          {placeholder}
        </Text>
      </Animated.View>
      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={styles.inputArea}>
          {prefix && <View style={styles.iconArea}>{prefix}</View>}
          <TextInput
            ref={inputRef}
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
      <AnimatedText
        weight="Medium"
        style={[styles.errorMessage, errorMessageStyles]}
      >
        {errorMessage}
      </AnimatedText>
    </Animated.View>
  );
}
