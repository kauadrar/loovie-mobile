import { colors } from '@/styles';
import { postSchema } from '@/validators';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import { CalendarClock, Camera, Images } from 'lucide-react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetTextArea } from '../bottom-sheet';
import { Gif } from '../icons';
import {
  BottomSheetModal,
  GorhomBottomSheetModal,
  TooltipButton,
} from '../shared';

const options = [
  {
    Icon: Images,
    label: 'Choose from gallery',
  },
  {
    Icon: Camera,
    label: 'Take a photo',
  },
  {
    Icon: Gif,
    label: 'Search for a GIF',
  },
  {
    Icon: CalendarClock,
    label: 'Schedule your post',
  },
];

export const NewPostModal = forwardRef<GorhomBottomSheetModal>(
  function NewPostModal(props, ref) {
    const bottomSheetModalRef = useRef<GorhomBottomSheetModal>(null);
    const { control } = useForm({
      resolver: yupResolver(postSchema),
    });

    useImperativeHandle(ref, () => bottomSheetModalRef.current!);

    const goToStartPosition = useCallback(() => {
      bottomSheetModalRef.current?.snapToIndex(0);
    }, []);

    useEffect(() => {
      const unsubscribe = Keyboard.addListener('keyboardDidHide', () => {
        goToStartPosition();
      });
      return () => {
        unsubscribe.remove();
      };
    }, [goToStartPosition]);

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={[360]}
        enableDynamicSizing={false}
      >
        <BottomSheetView className="flex-1">
          <Pressable onPress={() => Keyboard.dismiss()} className="flex-1">
            <SafeAreaView edges={['bottom']} className="px-4 pt-4 pb-10 gap-5">
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, ...field } }) => (
                  <BottomSheetTextArea
                    label="Post"
                    placeholder="Teste"
                    onChangeText={onChange}
                    {...field}
                  />
                )}
              />
              <View className="flex-row items-center gap-3 px-1">
                {options.map(({ Icon, label }) => (
                  <TooltipButton label={label} key={label}>
                    <Icon color={colors.gray1} />
                  </TooltipButton>
                ))}
              </View>
            </SafeAreaView>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
