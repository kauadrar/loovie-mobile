import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './Button.styles';

export const Button = forwardRef<View, TouchableOpacityProps>(function Button(
  { children, style, ...props },
  ref,
) {
  return (
    <TouchableOpacity ref={ref} style={[styles.button, style]} {...props}>
      {typeof children === 'string' ? (
        <Text style={styles.buttonText} weight="Medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
});
