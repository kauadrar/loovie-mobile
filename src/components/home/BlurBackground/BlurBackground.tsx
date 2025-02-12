import { BlurView, BlurViewProps } from 'expo-blur';
import { cssInterop } from 'nativewind';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BlurBackgroundProps, BlurBackgroundRef } from './BlurBackground.types';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const StyledTouchableWithoutFeedback = cssInterop(TouchableWithoutFeedback, {
  className: 'style',
});

export const BlurBackground = forwardRef<
  BlurBackgroundRef,
  BlurBackgroundProps
>(function BlurBackground({ onPress }, ref) {
  const blurIntensity = useSharedValue(0);
  const blurViewAnimatedProps = useAnimatedProps<BlurViewProps>(() => ({
    intensity: blurIntensity.value,
  }));
  const blurViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(blurIntensity.value, [0, 15], [0, 1]),
  }));

  const show = (callback?: () => void) => {
    blurIntensity.value = withTiming(15, { duration: 600 }, () => {
      callback && runOnJS(callback)();
    });
  };

  const hide = (callback?: () => void) => {
    blurIntensity.value = withTiming(0, { duration: 600 }, () => {
      callback && runOnJS(callback)();
    });
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <AnimatedBlurView
      {...Platform.select({
        ios: { animatedProps: blurViewAnimatedProps },
        android: { intensity: 15 },
      })}
      className="h-screen w-screen absolute top-[calc(env(safe-area-inset-top)+50px)]"
      style={Platform.OS === 'android' && blurViewAnimatedStyle}
      experimentalBlurMethod="dimezisBlurView"
      blurReductionFactor={10}
      tint="dark"
    >
      <StyledTouchableWithoutFeedback onPress={onPress} className="h-screen" />
    </AnimatedBlurView>
  );
});
