import { Text } from '@/components/shared';
import { colors } from '@/styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  Article,
  NewspaperClipping,
  NotePencil,
  Plus,
  Star,
} from 'phosphor-react-native';
import React, { ReactNode, useRef } from 'react';
import { Pressable, TouchableOpacity, View, ViewProps } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { NewPostModal } from '../post/NewPostModal';

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
  onPress?: () => void;
};

const FloatingActionButton = ({
  isExpanded,
  index,
  icon,
  label,
  onPress,
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
    <Animated.View style={animatedStyles} className="absolute right-0">
      <AnimatedTouchableOpacity
        className="h-10 rounded-full justify-end items-center -z-10 flex-row gap-1"
        onPress={onPress}
      >
        <AnimatedText className="font-urbanist-medium">{label}</AnimatedText>
        <Animated.View className="w-10 h-10 bg-gray-800 rounded-full justify-center items-center bottom-0 -z-10">
          {icon}
        </Animated.View>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};

export function NewPostButton() {
  const isExpanded = useSharedValue(false);
  const newPostModalRef = useRef<BottomSheetModal>(null);

  const toggleExpansion = () => {
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

  const openNewPostModal = () => {
    toggleExpansion();
    newPostModalRef.current?.present();
  };

  return (
    <>
      <AnimatedPressable
        animatedProps={pressableAnimatedProps}
        className="absolute flex-1 w-full h-full"
        onPress={toggleExpansion}
      />
      <View className="absolute items-center bottom-2 right-5 z-10">
        <AnimatedTouchableOpacity
          onPress={toggleExpansion}
          className="h-16 w-14 rounded-full bg-gray-800 justify-center items-center flex-row gap-2 z-10"
          style={buttonStyle}
        >
          <Animated.View style={plusIconStyle}>
            <Plus size={16} color={colors.white} weight="bold" />
          </Animated.View>
          <AnimatedText
            className="font-urbanist-medium hidden"
            style={buttonText}
          >
            New
          </AnimatedText>
        </AnimatedTouchableOpacity>
        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          label="Post"
          icon={<NotePencil color={colors.white} />}
          onPress={openNewPostModal}
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
      <NewPostModal ref={newPostModalRef} />
    </>
  );
}
