/* eslint react-hooks/exhaustive-deps: off */

import { BackButton, Button, Text } from '@/components/shared';
import { SignUpValues } from '@/types';
import {
  signUpFirstStepSchema,
  signUpSecondStepSchema,
  signUpThirdStepSchema,
} from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackHandler } from '@react-native-community/hooks';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useWindowDimensions, View, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SignUpFirstStep } from './SignUpFirstStep';
import { styles } from './SignUpForm.styles';
import { SignUpFormProps } from './SignUpForm.types';
import { SignUpSecondStep } from './SignUpSecondStep';
import { SignUpThirdStep } from './SignUpThirdStep';

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { top: topInset } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useAnimatedRef<FlatList>();
  const [numberOfSteps, setNumberOfSteps] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstStepForm = useForm({
    resolver: yupResolver(signUpFirstStepSchema),
  });
  const secondStepForm = useForm({
    resolver: yupResolver(signUpSecondStepSchema),
  });
  const thirdStepForm = useForm({
    resolver: yupResolver(signUpThirdStepSchema),
  });

  const handleButtonPress = () => {
    const step = allSteps[currentStepIndex];

    step.form.handleSubmit(() => {
      if (step.form.formState.isSubmitted) {
        const nextStepIndex = currentStepIndex + 1;

        listRef.current?.scrollToIndex({
          index: nextStepIndex,
          animated: true,
        });

        const step = steps[nextStepIndex];

        if (nextStepIndex === 1) {
          (
            step.form as UseFormReturn<
              typeof signUpSecondStepSchema.__outputType
            >
          ).setFocus('firstName');
        } else if (nextStepIndex === 2) {
          (
            step.form as UseFormReturn<
              typeof signUpThirdStepSchema.__outputType
            >
          ).setFocus('password');
        }

        return;
      }

      if (currentStepIndex < 2) {
        setNumberOfSteps((prev) => prev + 1);
        setIsSubmitting(true);

        return;
      }

      const values = allSteps
        .map(({ form }) => form.getValues())
        .reduce((acc, value) => ({ ...acc, ...value }), {});

      onSubmit(values as SignUpValues);
    })();
  };

  const allSteps = [
    {
      component: (
        <SignUpFirstStep
          form={firstStepForm}
          handleSubmit={handleButtonPress}
        />
      ),
      form: firstStepForm,
    },
    {
      component: (
        <SignUpSecondStep
          form={secondStepForm}
          handleSubmit={handleButtonPress}
        />
      ),
      form: secondStepForm,
    },
    {
      component: (
        <SignUpThirdStep
          form={thirdStepForm}
          handleSubmit={handleButtonPress}
        />
      ),
      form: thirdStepForm,
    },
  ];
  const steps = allSteps.slice(0, numberOfSteps);
  const listPosition = useSharedValue(0);
  const AnimatedText = Animated.createAnimatedComponent(Text);
  const username = firstStepForm.watch('username');
  const email = firstStepForm.watch('email');

  const firstName = secondStepForm.watch('firstName');
  const lastName = secondStepForm.watch('lastName');
  const birthday = secondStepForm.watch('birthday');

  useEffect(() => {
    if (currentStepIndex === 0) {
      const step = allSteps[currentStepIndex];

      if (!step.form.formState.isValid) {
        setNumberOfSteps(1);
      } else if (step.form.formState.isSubmitted && numberOfSteps === 1) {
        setNumberOfSteps(2);
      }
    }
  }, [username, email, numberOfSteps, currentStepIndex, allSteps]);

  useEffect(() => {
    if (currentStepIndex === 1) {
      const step = allSteps[currentStepIndex];

      if (!step.form.formState.isValid) {
        setNumberOfSteps(2);
      } else if (step.form.formState.isSubmitted && numberOfSteps === 2) {
        setNumberOfSteps(3);
      }
    }
  }, [
    firstName,
    lastName,
    birthday,
    numberOfSteps,
    currentStepIndex,
    allSteps,
  ]);

  const onPressBack = () => {
    if (currentStepIndex > 0) {
      listRef.current?.scrollToIndex({
        index: currentStepIndex - 1,
        animated: true,
      });

      return true;
    }

    router.back();
    return true;
  };

  useBackHandler(onPressBack);

  const onScroll = useAnimatedScrollHandler(
    {
      onScroll: ({ contentOffset: { x } }) => {
        listPosition.value = x;
      },
    },
    [],
  );

  const nextButtonAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      listPosition.value,
      [width * 1.1, width * 1.38],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  }, []);

  const submitButtonAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      listPosition.value,
      [width * 1.38, width * 2],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length === 1 && viewableItems[0].index !== null) {
        const stepIndex = viewableItems[0].index;
        setCurrentStepIndex(stepIndex);

        if (isSubmitting) {
          const step = allSteps[stepIndex];

          if (stepIndex === 1) {
            (
              step.form as UseFormReturn<
                typeof signUpSecondStepSchema.__outputType
              >
            ).setFocus('firstName');
          } else if (stepIndex === 2) {
            (
              step.form as UseFormReturn<
                typeof signUpThirdStepSchema.__outputType
              >
            ).setFocus('password');
          }
          setIsSubmitting(false);
        }
      }
    },
    [allSteps],
  );

  const onContentSizeChange = useCallback(
    (w: number) => {
      if (isSubmitting) {
        listRef.current?.scrollToOffset({ offset: w - width, animated: true });
      }
    },
    [isSubmitting],
  );
  return (
    <>
      <BackButton
        style={[styles.backButton, { top: topInset }]}
        onPress={onPressBack}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Animated.FlatList
          onScroll={onScroll}
          ref={listRef}
          data={steps}
          renderItem={({ item: { component } }) => component}
          keyboardShouldPersistTaps="handled"
          horizontal
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          onViewableItemsChanged={onViewableItemsChanged}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onContentSizeChange={onContentSizeChange}
        />
        <View style={styles.footer}>
          <Button onPress={handleButtonPress}>
            <AnimatedText style={[styles.buttonText, nextButtonAnimatedStyles]}>
              Próximo
            </AnimatedText>
            <AnimatedText
              style={[
                styles.buttonText,
                styles.submitText,
                submitButtonAnimatedStyles,
              ]}
            >
              Cadastrar
            </AnimatedText>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
