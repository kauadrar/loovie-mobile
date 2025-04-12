import { BlurView } from '@/components/nativewind';
import { BlurViewProps } from 'expo-blur';
import React, { forwardRef, useImperativeHandle } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type BlurBackgroundProps = {
  onPress: () => void;
};

export type BlurBackgroundRef = {
  show: (callback?: () => void) => void;
  hide: (callback?: () => void) => void;
};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const BlurBackground = forwardRef<
  BlurBackgroundRef,
  BlurBackgroundProps
>(function BlurBackground({ onPress }, ref) {
  const blurIntensity = useSharedValue(0);
  const blurViewAnimatedProps = useAnimatedProps<BlurViewProps>(() => ({
    intensity: blurIntensity.value,
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
      animatedProps={blurViewAnimatedProps}
      intensity={15}
      className="h-screen w-screen absolute top-[calc(env(safe-area-inset-top)+50px)]"
      experimentalBlurMethod="dimezisBlurView"
      blurReductionFactor={10}
      tint="dark"
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View className="h-screen w-screen" />
      </TouchableWithoutFeedback>
    </AnimatedBlurView>
  );
});
