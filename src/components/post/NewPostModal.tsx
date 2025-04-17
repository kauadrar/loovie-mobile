import { postSchema } from '@/validators';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetTextArea } from '../bottom-sheet';
import { BottomSheetModal, GorhomBottomSheetModal } from '../shared';

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
        snapPoints={['50%']}
        enableDynamicSizing={false}
      >
        <BottomSheetView>
          <SafeAreaView edges={['bottom']} style={styles.container}>
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
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
});
