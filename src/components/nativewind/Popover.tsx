import { cssInterop } from 'nativewind';
import PopoverView from 'react-native-popover-view';

export const Popover = cssInterop(PopoverView, {
  popoverClassName: 'popoverStyle',
  backgroundClassName: 'backgroundStyle',
});
