import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './Button.styles';
import { forwardRef } from 'react';

export const Button = forwardRef<TouchableOpacity, TouchableOpacityProps>(
  function Button({ children, style, ...props }, ref) {
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
  },
);
