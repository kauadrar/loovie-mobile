import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import {} from 'react-native-gesture-handler';
import { withUnistyles } from 'react-native-unistyles';
import { Text } from '../Text/Text';
import { styles } from './Button.styles';

const UniTouchableOpacity = withUnistyles(TouchableOpacity);

export const Button = forwardRef<View, TouchableOpacityProps>(function Button(
  { children, style, ...props },
  ref,
) {
  return (
    <UniTouchableOpacity ref={ref} style={styles.button(style)} {...props}>
      {typeof children === 'string' ? (
        <Text style={styles.buttonText} weight="Medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </UniTouchableOpacity>
  );
});
