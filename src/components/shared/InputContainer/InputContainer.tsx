import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDebounce } from 'use-debounce';
import { Text } from '../Text/Text';
import { styles } from './InputContainer.styles';
import { InputContainerProps } from './InputContainer.types';

export function InputContainer({
  label,
  errorMessage,
  value,
  children,
}: InputContainerProps) {
  const labelOpacity = useSharedValue(1);
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const [debouncedErrorMessage] = useDebounce(errorMessage, 500);
  const labelAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: labelOpacity.value,
    };
  }, []);

  useEffect(() => {
    if (value) {
      labelOpacity.value = withTiming(1, { duration: 200 });
    } else {
      labelOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [value]);

  return (
    <Animated.View
      style={[styles.inputContainer]}
      layout={LinearTransition}
      collapsable={false}
    >
      {label && (
        <AnimatedText style={[styles.label, labelAnimatedStyles]}>
          {label}
        </AnimatedText>
      )}
      <View style={styles.inputArea}>{children}</View>
      {errorMessage && (
        <Animated.View
          style={
            !(errorMessage || debouncedErrorMessage) &&
            styles.occultedErrorMessage
          }
          entering={FadeInUp.duration(400)}
          exiting={FadeOutUp.duration(400)}
        >
          <Text numberOfLines={2} style={[styles.errorMessage]}>
            {errorMessage || debouncedErrorMessage}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}
