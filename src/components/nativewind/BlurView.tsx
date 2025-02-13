import { BlurView as RNBlurView } from 'expo-blur';
import { cssInterop } from 'nativewind';

export const BlurView = cssInterop(RNBlurView, {
  className: 'style',
});
