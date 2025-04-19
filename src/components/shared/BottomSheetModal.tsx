import { colors } from '@/styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModalProps,
  BottomSheetModal as GorhomBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BlurViewProps } from 'expo-blur';
import React, { forwardRef } from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import { BlurView } from '../nativewind';

export { GorhomBottomSheetModal };

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function Backdrop({ animatedIndex, ...props }: BottomSheetBackdropProps) {
  const blurViewAnimatedProps = useAnimatedProps<BlurViewProps>(() => {
    return { intensity: interpolate(animatedIndex.value, [-1, 0], [0, 20]) };
  });

  return (
    <AnimatedBlurView
      animatedProps={blurViewAnimatedProps}
      className="h-screen w-screen absolute"
      experimentalBlurMethod="dimezisBlurView"
      blurReductionFactor={100}
      tint="dark"
    >
      <BottomSheetBackdrop
        {...props}
        animatedIndex={animatedIndex}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior="close"
      />
    </AnimatedBlurView>
  );
}

export const BottomSheetModal = forwardRef<
  GorhomBottomSheetModal,
  BottomSheetModalProps
>(function BottomSheetModal(props, ref) {
  return (
    <GorhomBottomSheetModal
      handleIndicatorStyle={{
        backgroundColor: colors.gray1,
      }}
      backgroundStyle={{
        backgroundColor: colors.background,
      }}
      {...props}
      ref={ref}
      backdropComponent={Backdrop}
    />
  );
});
