import { Pressable, TextInput, TextInputProps, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { InputProps } from "./Input.types";
import { styles } from "./Input.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { colors } from "@/styles";
import { Text } from "../Text/Text";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function Input({ type = 'text', value, placeholder, errorMessage, preffix, suffix, ...props}: InputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordIcon = isPasswordVisible ? 'eye-off-outline' : 'eye-outline';
  const isInputPassword = type === 'password';
  const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);
  const placeholderOpacity = useSharedValue(1)
  const labelLeft = useSharedValue(50)
  const focusInput = () => {
    inputRef.current?.focus()
  }
  const AnimatedText = Animated.createAnimatedComponent(Text)
  const placeholderAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: placeholderOpacity.value
    }
  }, [])

  const labelAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(placeholderOpacity.value, [0, 1], [1, 0]),
    }
  }, [])

  useEffect(() => {
    if (value) {
      placeholderOpacity.value = withTiming(0, { duration: 200 })
    } else {
      placeholderOpacity.value = withTiming(1, { duration: 200 })
    }
  }, [value])

  return (
    <View style={styles.inputContainer}>
      <AnimatedText style={[styles.label, labelAnimatedStyles]}>{placeholder}</AnimatedText>
      <Animated.View style={[styles.placeholderArea, placeholderAnimatedStyles]}>
        <Text style={styles.placeholder} onPress={focusInput}>{placeholder}</Text>
      </Animated.View>
      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={styles.inputArea}>
          {preffix && (
            <View style={styles.iconArea}>
              {preffix}
            </View>
          )}
          <TextInput ref={inputRef} placeholderTextColor={colors.gray1} style={styles.input} value={value} {...props} multiline={type === 'area'} secureTextEntry={isInputPassword && !isPasswordVisible} />
          {(isInputPassword || suffix) && (
            <View style={styles.iconArea}>
              {isInputPassword ? (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <MaterialCommunityIcons name={showPasswordIcon} size={24} color={colors.gray1} />
                </TouchableOpacity>
              ) : suffix}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text weight="Medium" style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  )
}