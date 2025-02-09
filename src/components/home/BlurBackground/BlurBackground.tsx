import { BlurView, BlurViewProps } from 'expo-blur';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './BlurBackground.styles';
import { BlurBackgroundProps, BlurBackgroundRef } from './BlurBackground.types';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const BlurBackground = forwardRef<
  BlurBackgroundRef,
  BlurBackgroundProps
>(function BlurBackground({ onPress }, ref) {
  const blurIntensity = useSharedValue(0);
  const { top: topInset } = useSafeAreaInsets();
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
      style={[
        styles.container,
        { top: 50 + topInset },
        Platform.OS === 'android' && blurViewAnimatedStyle,
      ]}
      experimentalBlurMethod="dimezisBlurView"
      blurReductionFactor={10}
      tint="dark"
    >
      <TouchableWithoutFeedback
        onPress={onPress}
        style={styles.touchableArea}
      />
    </AnimatedBlurView>
  );
});
