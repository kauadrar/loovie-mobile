import { Text } from '@/components/shared';
import { colors } from '@/styles';
import {
  Article,
  NewspaperClipping,
  NotePencil,
  Plus,
  Star,
} from 'phosphor-react-native';
import React, { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedText = Animated.createAnimatedComponent(Text);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

type FloatingActionButtonProps = {
  isExpanded: SharedValue<boolean>;
  index: number;
  icon: ReactNode;
  label: string;
};

const FloatingActionButton = ({
  isExpanded,
  index,
  icon,
  label,
}: FloatingActionButtonProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyles, styles.container]}>
      <AnimatedTouchableOpacity style={[styles.content]} onPress={() => {}}>
        <AnimatedText style={styles.label}>{label}</AnimatedText>
        <Animated.View style={styles.button}>{icon}</Animated.View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};

export function NewPostButton() {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = isExpanded.value ? '45deg' : '0deg';

    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const width = isExpanded.value ? 80 : 56;

    return {
      width: withSpring(width),
    };
  });

  const buttonText = useAnimatedStyle(() => {
    const display = isExpanded.value ? 'flex' : 'none';

    return {
      display,
    };
  });

  const pressableAnimatedProps = useAnimatedProps(() => {
    return {
      pointerEvents: (isExpanded.value
        ? 'auto'
        : 'none') as ViewProps['pointerEvents'],
    };
  });

  return (
    <>
      <AnimatedPressable
        animatedProps={pressableAnimatedProps}
        style={styles.backdrop}
        onPress={handlePress}
      />
      <View style={styles.buttonContainer}>
        <Animated.View style={[{ zIndex: 1 }, buttonStyle]}>
          <TouchableOpacity
            onPress={handlePress}
            style={mainButtonStyles.button}
          >
            <Animated.View style={plusIconStyle}>
              <Plus size={16} color={colors.white} weight="bold" />
            </Animated.View>
            <AnimatedText style={[buttonText, styles.label]}>New</AnimatedText>
          </TouchableOpacity>
        </Animated.View>
        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          label="Post"
          icon={<NotePencil color={colors.white} />}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={2}
          label="Review"
          icon={<Star color={colors.white} />}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={3}
          label="Analysis"
          icon={<Article color={colors.white} />}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={4}
          label="News"
          icon={<NewspaperClipping color={colors.white} />}
        />
      </View>
    </>
  );
}

const mainButtonStyles = StyleSheet.create({
  button: {
    height: 56,
    width: '100%',
    borderRadius: 100,
    backgroundColor: colors.gray2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    right: 0,
  },
  content: {
    height: 40,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -2,
    flexDirection: 'row',
    gap: 4,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray2,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
    flexDirection: 'row',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
  label: {
    color: '#f8f9ff',
    fontWeight: 500,
  },
});
