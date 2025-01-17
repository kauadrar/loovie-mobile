import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { styles } from './Text.styles';
import { TextProps } from './Text.types';

export const Text = forwardRef<RNText, TextProps>(function Text(
  { family = 'Urbanist', weight = 'Regular', style, children, ...props },
  ref,
) {
  const fontFamily = `${family}-${weight}`;
  return (
    <RNText ref={ref} style={[styles.text, { fontFamily }, style]} {...props}>
      {children}
    </RNText>
  );
});
