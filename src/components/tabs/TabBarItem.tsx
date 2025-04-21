import { PlatformPressable } from '@react-navigation/elements';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../shared';

type TabBarItemProps = {
  icon?: React.ReactElement;
  label?: string;
  focused: boolean;
  color?: string;
  onPress?: () => void;
  onLongPress?: () => void;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

export function TabBarItem({
  icon,
  label,
  focused,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = 0;
    }
  }, [focused]);

  const activeIndicatorStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width: interpolate(opacity.value, [0, 1], [0, 64]),
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: interpolate(opacity.value, [0, 1], [0, 18]),
  }));

  return (
    <View className="gap-1 items-center">
      <Animated.View
        className="h-10 bg-primary-500/15 rounded-full absolute w-0 opacity-0"
        style={activeIndicatorStyle}
      />
      <View className="h-10 w-[64px] rounded-full overflow-hidden">
        <PlatformPressable
          android_ripple={{
            color: '#ffffff11',
          }}
          className="h-10 rounded-full w-[64px] justify-center items-center"
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {icon}
        </PlatformPressable>
      </View>
      <Animated.View style={textAnimatedStyle}>
        <Text className="text-sm text-center text-primary-500 font-urbanist-bold">
          {label}
        </Text>
      </Animated.View>
    </View>
  );
}
