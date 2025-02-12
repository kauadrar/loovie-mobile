import { LoovieFilmStrip, LooviePlay } from '@/components/svgs';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const AnimatedLoovieFilmStrip =
  Animated.createAnimatedComponent(LoovieFilmStrip);

export function Loading() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
    );
  }, [rotation]);

  return (
    <View>
      <AnimatedLoovieFilmStrip size={42} style={animatedStyle} />
      <LooviePlay size={42} style={styles.play} />
    </View>
  );
}

const styles = StyleSheet.create({
  play: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
