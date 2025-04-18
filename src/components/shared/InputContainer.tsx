import { ReactNode, useEffect } from 'react';
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
import { Text } from './Text';

export type InputContainerProps = {
  label?: string;
  errorMessage?: string;
  value?: string | Date;
  children: ReactNode;
  disablePlaceholderAnimation?: boolean;
};

export function InputContainer({
  label,
  errorMessage,
  value,
  children,
}: InputContainerProps) {
  const labelOpacity = useSharedValue(0);
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
      className="w-full gap-1"
      layout={LinearTransition}
      collapsable={false}
    >
      {label && (
        <AnimatedText
          className="color-gray-500 text-base h-6 ml-1"
          style={labelAnimatedStyles}
        >
          {label}
        </AnimatedText>
      )}
      <View className="z-10">{children}</View>
      {errorMessage && (
        <Animated.View
          className={
            !(errorMessage || debouncedErrorMessage) ? `absolute top-0` : ''
          }
          entering={FadeInUp.duration(400)}
          exiting={FadeOutUp.duration(400)}
        >
          <Text numberOfLines={2} className={`text-sm text-danger`}>
            {errorMessage || debouncedErrorMessage}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}
