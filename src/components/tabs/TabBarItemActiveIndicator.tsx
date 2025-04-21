import { useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TabBarItemActiveIndicatorProps = {
  focused: boolean;
};

export function TabBarItemActiveIndicator() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 2000 });

    return () => {
      opacity.value = withTiming(0, { duration: 2000 });
    };
  }, []);

  const activeIndicatorStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width: interpolate(opacity.value, [0, 1], [0, 65]),
  }));

  return (
    <Animated.View
      className="h-10 bottom-5 bg-primary-500/25 rounded-full absolute w-0 opacity-0"
      style={activeIndicatorStyle}
    />
  );
}
